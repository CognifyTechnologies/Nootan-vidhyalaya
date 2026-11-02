import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly langService = inject(LanguageService);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly openAdmin = output<void>();

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  switchLang(lang: 'gu' | 'en'): void {
    this.langService.setLanguage(lang);
  }

  onAdminClick(event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();
    this.openAdmin.emit();
  }
}

