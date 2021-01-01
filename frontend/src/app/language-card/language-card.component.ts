import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../core/interfaces/language.interface';
import { LanguageService} from '../core/services/language.service';

@Component({
  selector: 'app-language-card',
  templateUrl: './language-card.component.html',
  styleUrls: ['./language-card.component.scss']
})
export class LanguageCardComponent implements OnInit{

  @Input() language: Language = null;

  constructor(
		public ls: LanguageService

  ) { }

  ngOnInit(): void {
		this.ls.getLanguages();
	}
}
