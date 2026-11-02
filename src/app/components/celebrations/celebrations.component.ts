import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-celebrations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './celebrations.component.html',
  styleUrl: './celebrations.component.scss'
})
export class CelebrationsComponent {
  readonly langService = inject(LanguageService);
}

