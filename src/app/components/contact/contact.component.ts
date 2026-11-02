import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly langService = inject(LanguageService);

  contactForm = {
    name: '',
    phone: '',
    subject: '',
    message: ''
  };

  readonly isSent = signal<boolean>(false);

  sendMessage(): void {
    if (!this.contactForm.name || !this.contactForm.phone) {
      alert(this.langService.currentLang() === 'gu' ? 'કૃપા કરી નામ અને ફોન નંબર દાખલ કરો.' : 'Please enter your name and phone number.');
      return;
    }

    this.isSent.set(true);
    setTimeout(() => {
      this.isSent.set(false);
      this.contactForm = { name: '', phone: '', subject: '', message: '' };
    }, 4000);
  }
}

