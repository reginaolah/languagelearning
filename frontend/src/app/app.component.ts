import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {filter, map, startWith} from 'rxjs/operators';
import { User } from './core/interfaces/user.interface';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';
import { Router } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { _getOptionScrollPosition } from '@angular/material/core';
import { Language } from '../app/core/interfaces/language.interface';
import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  options: string[] = [];
  languages: Language[] = [];
  filteredOptions: Observable<string[]>;
  
  myControl = new FormControl();

  @Input() selected: string = null;

  
  constructor(
    public router: Router,
    public ls: LanguageService
    ) {}

    ngOnInit() {
      this.ls.getLanguages().then((languages: Language[]) =>{
      this.languages = languages;
      languages.forEach( element => {
        this.options.push(element.language);
      });
    })
    
     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  
  }
 
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
      );
  }

  setSelectedLanguage(language: string) {
    this.languages.forEach(element => {
      if(element.language == language){
        localStorage.setItem('selectedLanguage', element.id.toString());
      }
      
    })
  
  }
}