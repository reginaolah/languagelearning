import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { Language } from '../core/interfaces/language.interface';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import {LanguageService } from '../core/services/language.service'
import { TeachersService } from '../core/services/teachers.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isSignedIn$: Observable<boolean>;
  languages$: Language[] = [];
  teachers$: User[] = [];
  options: string[] = [];
  @Input() selected: string;
  @Output() languageChanged: EventEmitter<Language> =   new EventEmitter();

  ngOnInit(): void {
    this.ls.getLanguages().then((languages: Language[]) =>{
      this.languages$ = languages;
      languages.forEach( element => {
        this.options.push(element.language);
        if(localStorage.getItem("selectedLanguage") == element.id.toString()){
          this.selected = element.language;
        }
      });
    })
  }

	constructor(
    public ls: LanguageService,
    public ts: TeachersService,
    protected as: AuthService,
    public router: Router,
    ) {
    this.isSignedIn$ = as.isSignedIn();

	}

	signout(): void {
		this.as.signout();
	}
  title = 'Italki Clone';

  @ViewChild('stickyMenu') menuElement: ElementRef;

  stickywhite: boolean = false;
  sticky: boolean = true;
  transparentlogo: boolean = true;
  whitelogo: boolean = false;

  elementPosition: any;
  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll < 510){
        this.stickywhite = false;
        this.whitelogo = false;
        this.transparentlogo = true;
      }
      if(windowScroll >= 510){
        this.stickywhite = true;
        this.whitelogo = true;
        this.transparentlogo = false;
      }
      else if(windowScroll <this.elementPosition){
        this.stickywhite = false;
        this.whitelogo = false;
        this.transparentlogo = true;
      }
      else {
        this.stickywhite = false;
        this.whitelogo = false;
        this.transparentlogo = true;
      }
    }

    setSelectedLanguage(language: string) {
      this.languages$.forEach(element => {
        if(element.language == language){
          localStorage.setItem('selectedLanguage', element.id.toString());
          this.selected = element.language;
          this.languageChanged.emit(element);        }
      })
    }
    
}
