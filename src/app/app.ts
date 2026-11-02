import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { AcademicsComponent } from './components/academics/academics.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CelebrationsComponent } from './components/celebrations/celebrations.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NoticesComponent } from './components/notices/notices.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminModalComponent } from './components/admin-modal/admin-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    AcademicsComponent,
    ActivitiesComponent,
    CelebrationsComponent,
    GalleryComponent,
    NoticesComponent,
    AdmissionComponent,
    ContactComponent,
    FooterComponent,
    AdminModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly langService = inject(LanguageService);
  readonly isAdminOpen = signal<boolean>(false);

  openAdmin(): void {
    this.isAdminOpen.set(true);
  }

  closeAdmin(): void {
    this.isAdminOpen.set(false);
  }
}
