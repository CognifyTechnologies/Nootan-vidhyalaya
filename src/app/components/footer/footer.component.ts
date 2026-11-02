import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly langService = inject(LanguageService);
  readonly openAdmin = output<void>();

  onAdminClick(event: Event): void {
    event.preventDefault();
    this.openAdmin.emit();
  }
}

