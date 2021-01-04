import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Lesson } from '../interfaces/lesson.interface';
import { LanguageArray } from '../interfaces/languageArray.interface';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) {}

  updateLesson(id: number, lesson: Lesson) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .patch<Lesson>(`${baseUrl}/lessons/update/${id}`, lesson, {
        headers: header,
      })
      .subscribe(
        (data) => {
          this.ns.show('Lesson changed!');
        },
        (error) => {
          this.ns.show('ERROR!');
          console.error(error);
        }
      );
  }
}
