import { Injectable, signal } from '@angular/core';
import { AdmissionApplication } from '../models/admission.model';

const STORAGE_KEY = 'nv_admissions_data';
const TARGET_EMAIL = 'dilippatel1979@gmail.com';

const getBackendUrl = (): string => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1') {
      return '/api/admission';
    }
  }
  return 'http://localhost:3000/api/admission';
};

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  readonly admissions = signal<AdmissionApplication[]>([]);
  readonly isSubmitting = signal<boolean>(false);
  readonly lastSubmission = signal<AdmissionApplication | null>(null);

  constructor() {
    this.loadAdmissions();
  }

  loadAdmissions(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.admissions.set(JSON.parse(stored));
          return;
        } catch (e) {
          console.error('Failed to parse local admissions', e);
        }
      }
    }
    // Default initial mock applications for showcase if empty
    this.admissions.set([
      {
        id: 'NV-2026-1001',
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        studentName: 'પટેલ આયુષ વિપુલભાઈ',
        dob: '2016-04-15',
        gender: 'પુરુષ (Male)',
        standard: 'ધોરણ ૫ (Std 5)',
        academicYear: '૨૦૨૬-૨૦૨૭ (2026-2027)',
        fatherName: 'પટેલ વિપુલભાઈ રમણભાઈ',
        motherName: 'પટેલ ગીતાબેન વિપુલભાઈ',
        mobile: '9825012345',
        email: 'vipul.patel@gmail.com',
        address: '૧૫, સરદાર સોસાયટી, કરણનગર, તા. કડી, જી. મહેસાણા',
        prevSchoolName: 'પ્રાથમિક શાળા કરણનગર',
        prevStandard: 'ધોરણ ૪',
        prevBoard: 'GSEB',
        hearAbout: 'અગાઉના વિદ્યાર્થી / વાલી મારફતે',
        suggestion: 'ખૂબ સુંદર શાળા છે.',
        status: 'Verified'
      },
      {
        id: 'NV-2026-1002',
        submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        studentName: 'પ્રજાપતિ દિયા નિલેશભાઈ',
        dob: '2014-08-22',
        gender: 'સ્ત્રી (Female)',
        standard: 'ધોરણ ૭ (Std 7)',
        academicYear: '૨૦૨૬-૨૦૨૭ (2026-2027)',
        fatherName: 'પ્રજાપતિ નિલેશભાઈ કાનજીભાઈ',
        motherName: 'પ્રજાપતિ મીનાબેન',
        mobile: '9428054321',
        address: 'શાંતિનિકેતન વાસ, કરણનગર, તા. કડી',
        prevSchoolName: 'કડી કન્યા શાળા',
        prevStandard: 'ધોરણ ૬',
        prevBoard: 'GSEB',
        hearAbout: 'શિક્ષક અથવા સંબંધી દ્વારા',
        suggestion: 'કમ્પ્યુટર અને રમત-ગમતની ઉત્તમ સુવિધા છે.',
        status: 'Admitted'
      }
    ]);
  }

  generateApplicationId(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `NV-2026-${random}`;
  }

  async submitAdmission(data: AdmissionApplication): Promise<{ success: boolean; applicationId: string; message?: string }> {
    this.isSubmitting.set(true);

    const applicationId = this.generateApplicationId();
    const application: AdmissionApplication = {
      ...data,
      id: applicationId,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    };

    let backendSuccess = false;
    let emailSent = false;

    // 1. Try submitting to backend API endpoint
    try {
      const endpoint = getBackendUrl();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: TARGET_EMAIL,
          application
        })
      });

      if (response.ok) {
        backendSuccess = true;
        const resJson = await response.json();
        if (resJson.emailSent) {
          emailSent = true;
        }
      }
    } catch {
      console.info('Direct API not reachable, utilizing client email fallback.');
    }

    // 2. Direct fallback webhook submission to FormSubmit / Web3Forms if backend wasn't running
    if (!backendSuccess) {
      try {
        await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `નવું પ્રવેશ ફોર્મ: ${application.studentName} (${application.standard}) - નૂતન વિદ્યાલય કરણનગર`,
            Application_No: application.id,
            Date: application.submittedAt,
            // Student
            Student_Name: application.studentName,
            Date_Of_Birth: application.dob,
            Gender: application.gender,
            Standard: application.standard,
            Academic_Year: application.academicYear,
            // Parent
            Father_Name: application.fatherName,
            Mother_Name: application.motherName,
            Mobile_Number: application.mobile,
            Email: application.email || 'N/A',
            Address: application.address,
            // Previous school
            Previous_School: application.prevSchoolName || 'N/A',
            Previous_Standard: application.prevStandard || 'N/A',
            Board: application.prevBoard || 'N/A',
            // Additional
            How_Heard: application.hearAbout || 'N/A',
            Suggestions: application.suggestion || 'N/A'
          })
        });
        emailSent = true;
      } catch (err) {
        console.warn('FormSubmit backup dispatch note:', err);
      }
    }

    // 3. Save persistently in localStorage
    const currentList = [application, ...this.admissions()];
    this.admissions.set(currentList);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
    }

    this.lastSubmission.set(application);
    this.isSubmitting.set(false);

    return {
      success: true,
      applicationId,
      message: emailSent
        ? `અરજી સફળતાપૂર્વક સ્વીકારવામાં આવી છે અને ${TARGET_EMAIL} પર ઈમેલ મોકલવામાં આવ્યો છે.`
        : `અરજી સફળતાપૂર્વક નોંધાઈ ગઈ છે (અરજી ક્રમાંક: ${applicationId}).`
    };
  }

  deleteAdmission(id: string): void {
    const updated = this.admissions().filter(a => a.id !== id);
    this.admissions.set(updated);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }

  updateStatus(id: string, status: 'Pending' | 'Verified' | 'Admitted'): void {
    const updated = this.admissions().map(a => a.id === id ? { ...a, status } : a);
    this.admissions.set(updated);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }
}

