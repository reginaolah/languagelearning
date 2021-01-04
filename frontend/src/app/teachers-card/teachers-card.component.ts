import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language } from '../core/interfaces/language.interface';
import { Lesson } from '../core/interfaces/lesson.interface';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { BookingService } from '../core/services/booking.service';
import {TeachersService} from '../core/services/teachers.service';
import * as moment from 'moment';
import * as dateformat from 'dateformat';
import { DatesService } from '../core/services/dates.service';

@Component({
  selector: 'app-teachers-card',
  templateUrl: './teachers-card.component.html',
  styleUrls: ['./teachers-card.component.scss']
})

export class TeachersCardComponent {

  @Input() teacher: User = null;
  @Input() languages = new Observable<Language[]>();
  @Input() date: Date;
  selectedLesson: Lesson;
  @Input() bookedDates: Date[] =[];
  todayDate:Date = new Date();
  isBooked:boolean = false;
  @Input() isSignedIn$: boolean;
  bookedLessons: Lesson[];
  
  constructor(
    public bs: BookingService,
    public router: Router, 
  ) {
   
  }


  bookLesson(date: Date):void {
    if(this.isSignedIn$){
      this.bs.book(date, this.selectedLesson.id);
      this.router.navigate(['dashboard']);
    }
    else {
      this.router.navigate(['signin']);
    }  
  }

  setSelectedLesson(lesson: Lesson){
    this.selectedLesson = lesson;
    localStorage.setItem("selectedLesson", this.selectedLesson.id.toString());
    console.log(this.selectedLesson);
  }

  dateFilter = (d: Date): boolean => {
    return this.checkBookedDates(d);
    
  }

    checkBookedDates(d: Date):boolean {
      let date = dateformat(d, "yyyy-mm-dd");
      let booked: boolean = true;
      this.bookedDates.forEach(element => {
        let formattedDate = dateformat(element, "yyyy-mm-dd");
          if(moment(formattedDate).isSame(date)){
            booked = false;
          }
        });
    return booked;  
  }

}
