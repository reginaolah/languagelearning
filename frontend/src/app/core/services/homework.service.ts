import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {baseUrl} from 'src/environments/environment';
import { Homework } from '../interfaces/homework.interface';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) { }

  getHomeworkByUuid(uuid: String): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get(`${baseUrl}/homeworks/${uuid}` , {headers: header,responseType: 'json'}).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.ns.show('ERROR!');
        console.error(error);
      }
    )
  }

  postNewHomework(homework: Homework): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http.post<Homework>(`${baseUrl}/homeworks/newhomework`, homework , {headers: header,responseType: 'json'}).subscribe(
      data => {
        this.ns.show('Homework created!');
      },
      error => {
        this.ns.show('ERROR!');
        console.error(error);
      }
    )
  }
}
