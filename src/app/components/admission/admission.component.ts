import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { AdmissionService } from '../../services/admission.service';
import { AdmissionApplication } from '../../models/admission.model';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent {
  readonly langService = inject(LanguageService);
  readonly admissionService = inject(AdmissionService);

  readonly standardsList = [
    { val: 'બાલવાટિકા (Balvatika / Pre-Primary)', labelGu: 'બાલવાટિકા (પૂર્વ પ્રાથમિક)', labelEn: 'Balvatika (Pre-Primary)' },
    { val: 'ધોરણ ૧ (Std 1)', labelGu: 'ધોરણ ૧ (Std 1)', labelEn: 'Standard 1' },
    { val: 'ધોરણ ૨ (Std 2)', labelGu: 'ધોરણ ૨ (Std 2)', labelEn: 'Standard 2' },
    { val: 'ધોરણ ૩ (Std 3)', labelGu: 'ધોરણ ૩ (Std 3)', labelEn: 'Standard 3' },
    { val: 'ધોરણ ૪ (Std 4)', labelGu: 'ધોરણ ૪ (Std 4)', labelEn: 'Standard 4' },
    { val: 'ધોરણ ૫ (Std 5)', labelGu: 'ધોરણ ૫ (Std 5)', labelEn: 'Standard 5' },
    { val: 'ધોરણ ૬ (Std 6)', labelGu: 'ધોરણ ૬ (Std 6)', labelEn: 'Standard 6' },
    { val: 'ધોરણ ૭ (Std 7)', labelGu: 'ધોરણ ૭ (Std 7)', labelEn: 'Standard 7' },
    { val: 'ધોરણ ૮ (Std 8)', labelGu: 'ધોરણ ૮ (Std 8)', labelEn: 'Standard 8' },
    { val: 'ધોરણ ૯ (Std 9 - GSEB)', labelGu: 'ધોરણ ૯ (Std 9 - GSEB)', labelEn: 'Standard 9 (GSEB)' },
    { val: 'ધોરણ ૧૦ (Std 10 - GSEB)', labelGu: 'ધોરણ ૧૦ (Std 10 - GSEB)', labelEn: 'Standard 10 (GSEB)' },
    { val: 'ધોરણ ૧૧ સામાન્ય પ્રવાહ - કોમર્સ (Std 11 Commerce)', labelGu: 'ધોરણ ૧૧ સામાન્ય પ્રવાહ - કોમર્સ (Commerce)', labelEn: 'Standard 11 Commerce' },
    { val: 'ધોરણ ૧૧ સામાન્ય પ્રવાહ - આર્ટ્સ (Std 11 Arts)', labelGu: 'ધોરણ ૧૧ સામાન્ય પ્રવાહ - આર્ટ્સ (Arts)', labelEn: 'Standard 11 Arts' },
    { val: 'ધોરણ ૧૨ સામાન્ય પ્રવાહ - કોમર્સ (Std 12 Commerce)', labelGu: 'ધોરણ ૧૨ સામાન્ય પ્રવાહ - કોમર્સ (Commerce)', labelEn: 'Standard 12 Commerce' },
    { val: 'ધોરણ ૧૨ સામાન્ય પ્રવાહ - આર્ટ્સ (Std 12 Arts)', labelGu: 'ધોરણ ૧૨ સામાન્ય પ્રવાહ - આર્ટ્સ (Arts)', labelEn: 'Standard 12 Arts' }
  ];

  readonly academicYears = [
    '૨૦૨૬-૨૦૨૭ (2026-2027)',
    '૨૦૨૫-૨૦૨૬ (2025-2026)'
  ];

  readonly boardsList = ['GSEB (ગુજરાત બોર્ડ)', 'CBSE', 'ICSE', 'અન્ય (Other)'];

  formData: AdmissionApplication = this.getEmptyForm();
  readonly isSubmitted = signal<boolean>(false);
  readonly errorMessage = signal<string>('');
  readonly successMessage = signal<string>('');
  readonly submittedRecord = signal<AdmissionApplication | null>(null);

  getEmptyForm(): AdmissionApplication {
    return {
      studentName: '',
      dob: '',
      gender: 'પુરુષ (Male)',
      standard: '',
      academicYear: '૨૦૨૬-૨૦૨૭ (2026-2027)',
      fatherName: '',
      motherName: '',
      mobile: '',
      email: '',
      address: '',
      prevSchoolName: '',
      prevStandard: '',
      prevBoard: '',
      hearAbout: '',
      suggestion: ''
    };
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      this.errorMessage.set(
        this.langService.currentLang() === 'gu'
          ? 'કૃપા કરી લાલ રંગના ફુદડી (*) વાળા તમામ જરૂરી ખાના ભરો.'
          : 'Please fill in all mandatory fields marked with an asterisk (*).'
      );
      return;
    }

    // Validate mobile number format
    const cleanMobile = (this.formData.mobile || '').replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      this.errorMessage.set(
        this.langService.currentLang() === 'gu'
          ? 'કૃપા કરી માન્ય ૧૦ અંકનો મોબાઇલ નંબર દાખલ કરો.'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    this.errorMessage.set('');

    try {
      const result = await this.admissionService.submitAdmission(this.formData);
      if (result.success) {
        this.submittedRecord.set(this.admissionService.lastSubmission());
        this.successMessage.set(
          this.langService.currentLang() === 'gu'
            ? 'પ્રવેશ અરજી સફળતાપૂર્વક સ્વીકારાઈ ગઈ છે!'
            : 'Admission application submitted successfully!'
        );
        this.isSubmitted.set(true);
        form.resetForm(this.getEmptyForm());
      }
    } catch (err: any) {
      this.errorMessage.set(err?.message || 'અરજી મોકલવામાં ક્ષતિ થઈ. ફરી પ્રયાસ કરો.');
    }
  }

  printSlip(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  closeSuccessModal(): void {
    this.isSubmitted.set(false);
  }

  newForm(): void {
    this.formData = this.getEmptyForm();
    this.isSubmitted.set(false);
  }
}
