import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Lesson } from '../interfaces/lesson.interface';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { StudentLesson } from '../interfaces/studentlesson.interface';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  bookedDates$: Date[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) {}

  async getLessons(): Promise<StudentLesson[]> {
    let selectedLesson = localStorage.getItem("selectedLanguage");
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    console.log(`Bearer ${localStorage.getItem('token')}`);
    const lessons: StudentLesson[] = await this.http
      .get<StudentLesson[]>(`${baseUrl}/studentlessons/bookedDates/${selectedLesson}`, { headers: header })
      .toPromise();

    lessons.forEach(element => {
      this.bookedDates$.push(element.date);
    })
    return lessons;

  }
    
}
