import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

export interface GalleryItem {
  id: number;
  src: string;
  category: 'national' | 'sports' | 'campus' | 'academic';
  titleGu: string;
  titleEn: string;
  descGu: string;
  descEn: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  readonly langService = inject(LanguageService);
  readonly activeFilter = signal<'all' | 'national' | 'sports' | 'campus' | 'academic'>('all');
  readonly selectedItem = signal<GalleryItem | null>(null);

  readonly items: GalleryItem[] = [
    {
      id: 1,
      src: 'images/independence-day.jpg',
      category: 'national',
      titleGu: '૧૫ ઓગસ્ટ સ્વાતંત્ર્ય દિન - ભવ્ય ત્રિરંગા યાત્રા',
      titleEn: '15th August Independence Day - Grand Tiranga Rally',
      descGu: 'શાળાના વિદ્યાર્થીઓ હાથમાં તિરંગો લઈને રાષ્ટ્રભાવના સાથે જોડાયા.',
      descEn: 'Students proudly carrying the national tricolor in celebration.'
    },
    {
      id: 2,
      src: 'images/republic-day.jpg',
      category: 'national',
      titleGu: '૨૬ જાન્યુઆરી પ્રજાસત્તાક દિન - ભારત માતા વંદના',
      titleEn: '26th January Republic Day - Bharat Mata Ceremony',
      descGu: 'વિદ્યાર્થીઓ દ્વારા દેશભક્તિ નાટક અને ભારત માતા પૂજન કાર્યક્રમ.',
      descEn: 'Cultural drama and homage to Mother India on Republic Day.'
    },
    {
      id: 3,
      src: 'images/school-building.jpg',
      category: 'campus',
      titleGu: 'નૂતન વિદ્યાલય કરણનગર મુખ્ય ઈમારત & કેમ્પસ',
      titleEn: 'Nootan Vidhyalaya Main Campus Building',
      descGu: 'સુંદર બગીચો અને શાંત વાતાવરણ સાથેનું વિશાળ કેમ્પસ.',
      descEn: 'Sprawling green school campus and administrative building.'
    },
    {
      id: 4,
      src: 'images/sports-activities.jpg',
      category: 'sports',
      titleGu: 'સ્પોર્ટ્સ અને સહ-અભ્યાસિક પ્રવૃત્તિઓ પોસ્ટર',
      titleEn: 'Sports & Co-Curricular Activities Official Program',
      descGu: 'ચેસ, આર્ટ એન્ડ ક્રાફ્ટ, યોગ, કરાટે અને સંગીત તાલીમ.',
      descEn: 'Comprehensive multi-disciplinary sports and cultural coaching.'
    },
    {
      id: 5,
      src: 'images/sports-day.jpg',
      category: 'sports',
      titleGu: 'વાર્ષિક રમતગમત મહોત્સવ - એથ્લેટિક્સ સ્પર્ધાઓ',
      titleEn: 'Annual Sports Meet - Track & Field Events',
      descGu: 'દોડ, ઊંચી કૂદ અને મેદાની રમતોમાં ઉત્સાહપૂર્વક ભાગ.',
      descEn: 'Energetic participation in school track and field championships.'
    },
    {
      id: 6,
      src: 'images/science-lab.jpg',
      category: 'academic',
      titleGu: 'આધુનિક વિજ્ઞાન પ્રયોગશાળા (Science Lab)',
      titleEn: 'Modern Science Laboratory',
      descGu: 'ભૌતિક, રસાયણ અને જીવવિજ્ઞાનના પ્રેક્ટિકલ પ્રયોગો.',
      descEn: 'Hands-on experiential learning for Physics, Chemistry, and Biology.'
    },
    {
      id: 7,
      src: 'images/computer-lab.jpg',
      category: 'academic',
      titleGu: 'હાઈ-ટેક કમ્પ્યુટર લેબોરેટરી (IT Lab)',
      titleEn: 'High-Tech Computer Laboratory',
      descGu: 'હાઇ-સ્પીડ ઈન્ટરનેટ અને આધુનિક સોફ્ટવેર સાથે કમ્પ્યુટર શિક્ષણ.',
      descEn: 'Individual workstations equipped with digital curriculum tools.'
    },
    {
      id: 8,
      src: 'images/classroom.jpg',
      category: 'academic',
      titleGu: 'ડિજિટલ સ્માર્ટ ક્લાસરૂમ',
      titleEn: 'Digital Smart Classroom',
      descGu: 'પ્રોજેક્ટર અને ઓડિયો-વિઝ્યુઅલ સાધનો દ્વારા સ્માર્ટ શિક્ષણ.',
      descEn: 'Interactive multimedia teaching enabling deeper comprehension.'
    },
    {
      id: 9,
      src: 'images/library.jpg',
      category: 'academic',
      titleGu: 'સમૃદ્ધ જ્ઞાન સરવાણી - શાળા પુસ્તકાલય',
      titleEn: 'Knowledge Repository - School Library',
      descGu: 'પુસ્તકો, સંદર્ભ ગ્રંથો અને દૈનિક વર્તમાનપત્રોની વિશાળ સુવિધા.',
      descEn: 'Extensive repository of educational books and periodicals.'
    },
    {
      id: 10,
      src: 'images/cultural-dance.jpg',
      category: 'sports',
      titleGu: 'સાંસ્કૃતિક વાર્ષિકોત્સવ - રાસ અને લોકનૃત્ય',
      titleEn: 'Cultural Annual Day - Folk Dance & Garba',
      descGu: 'ગુજરાતી સંસ્કૃતિ અને લોકકલાની ભવ્ય રંગારંગ પ્રસ્તુતિ.',
      descEn: 'Celebrating heritage with folk dance and traditional performances.'
    },
    {
      id: 11,
      src: 'images/campus-view.jpg',
      category: 'campus',
      titleGu: 'પર્યાવરણ સભર નયનરમ્ય શાળા પરિસર',
      titleEn: 'Lush Green Peaceful Campus Grounds',
      descGu: 'વૃક્ષો અને હરિયાળી વચ્ચે કેળવાય છે સ્વસ્થ મન અને શરીર.',
      descEn: 'A serene green setting fostering healthy mind and spirit.'
    }
  ];

  setFilter(filter: 'all' | 'national' | 'sports' | 'campus' | 'academic'): void {
    this.activeFilter.set(filter);
  }

  get filteredItems(): GalleryItem[] {
    const f = this.activeFilter();
    if (f === 'all') return this.items;
    return this.items.filter(i => i.category === f);
  }

  openLightbox(item: GalleryItem): void {
    this.selectedItem.set(item);
  }

  closeLightbox(): void {
    this.selectedItem.set(null);
  }
}

