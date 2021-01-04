import { Component, Input, OnInit } from '@angular/core';
import { async, Observable } from 'rxjs';
import { Language } from '../core/interfaces/language.interface';
import { Lesson } from '../core/interfaces/lesson.interface';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { DatesService } from '../core/services/dates.service';
import { LanguageService } from '../core/services/language.service';
import { NotificationService } from '../core/services/notification.service';
import {TeachersService} from '../core/services/teachers.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teachers: User[] = [];
  lessons: Lesson[] = [];
  languages: Language[] = [];
  isSignedIn: Observable<boolean>;
  bookedDates: Date[] = [];

  constructor(
    public ts: TeachersService,
    public ls: LanguageService,
    public ns: NotificationService,
    public as: AuthService,
    public ds: DatesService
  ) { 
    this.isSignedIn = as.isSignedIn();
    console.log(this.isSignedIn)
  
  }

  ngOnInit(): void {
    //this.ts.getTeachers();

      this.ts.getTeachers().then((ts: User[]) => {
        this.teachers = ts;
    })

    this.ds.getLessons().then((ds: Lesson[]) => {
      this.lessons = ds;
      this.lessons.forEach(element => {
       this.bookedDates.push(element.date);
      })
  })
  }

  languageChangedHandler(language: Language) {
    localStorage.setItem("selectedLanguague", language.id.toString());
    this.ts.getTeachers().then((ts: User[]) => {
      this.teachers = ts;
    })

  }

}
