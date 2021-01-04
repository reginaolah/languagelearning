import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { StudentLesson } from '../interfaces/studentlesson.interface';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentlessonService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) {}

  async getLessons(): Promise<StudentLesson[]> {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    console.log(`Bearer ${localStorage.getItem('token')}`);
    const lessons: StudentLesson[] = await this.http
      .get<StudentLesson[]>(`${baseUrl}/studentlessons/`, { headers: header })
      .toPromise();
    return lessons;
  }

  deleteStudentlesson(id: number): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .delete(`${baseUrl}/studentlessons/delete/${id}`, {
        headers: header,
        responseType: 'text',
      })
      .subscribe();
    this.router.navigate(['/dashboard']);
  }
}
