import { Component, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { AdmissionService } from '../../services/admission.service';
import { AdmissionApplication } from '../../models/admission.model';

@Component({
  selector: 'app-admin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-modal.component.html',
  styleUrl: './admin-modal.component.scss'
})
export class AdminModalComponent {
  readonly langService = inject(LanguageService);
  readonly admissionService = inject(AdmissionService);

  readonly close = output<void>();
  readonly searchQuery = signal<string>('');
  readonly selectedRecord = signal<AdmissionApplication | null>(null);

  readonly filteredList = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.admissionService.admissions();
    if (!q) return list;
    return list.filter(item => 
      (item.studentName && item.studentName.toLowerCase().includes(q)) ||
      (item.fatherName && item.fatherName.toLowerCase().includes(q)) ||
      (item.mobile && item.mobile.includes(q)) ||
      (item.id && item.id.toLowerCase().includes(q)) ||
      (item.standard && item.standard.toLowerCase().includes(q))
    );
  });

  viewDetail(item: AdmissionApplication): void {
    this.selectedRecord.set(item);
  }

  closeDetail(): void {
    this.selectedRecord.set(null);
  }

  updateStatus(id: string, status: 'Pending' | 'Verified' | 'Admitted'): void {
    this.admissionService.updateStatus(id, status);
  }

  exportCsv(): void {
    const list = this.filteredList();
    if (list.length === 0) return;

    const headers = [
      'Application ID',
      'Submitted At',
      'Student Name',
      'DOB',
      'Gender',
      'Standard',
      'Academic Year',
      'Father Name',
      'Mother Name',
      'Mobile',
      'Email',
      'Address',
      'Prev School',
      'Prev Std',
      'Prev Board',
      'How Heard',
      'Status'
    ];

    const rows = list.map(a => [
      `"${a.id || ''}"`,
      `"${a.submittedAt || ''}"`,
      `"${a.studentName || ''}"`,
      `"${a.dob || ''}"`,
      `"${a.gender || ''}"`,
      `"${a.standard || ''}"`,
      `"${a.academicYear || ''}"`,
      `"${a.fatherName || ''}"`,
      `"${a.motherName || ''}"`,
      `"${a.mobile || ''}"`,
      `"${a.email || ''}"`,
      `"${(a.address || '').replace(/"/g, '""')}"`,
      `"${a.prevSchoolName || ''}"`,
      `"${a.prevStandard || ''}"`,
      `"${a.prevBoard || ''}"`,
      `"${a.hearAbout || ''}"`,
      `"${a.status || 'Pending'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Nootan_Vidhyalaya_Admissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }

  printCurrent(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}

