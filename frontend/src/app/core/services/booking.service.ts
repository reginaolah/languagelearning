import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {baseUrl} from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

// allow origin * -gal lehet engedélyezni a rest-hez kapcsolódó szabályokat


@Injectable({
  providedIn: 'root'
})


@Injectable()
export class BookingService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': ''
        })
      };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) { }

  book (date: Date, lessonNumber: Number) {
    const header = new HttpHeaders().set(
        'Authorization', `Bearer ${localStorage.getItem('token')}`,
    );

    this.http.post<number>(`${baseUrl}/studentLessons/book/${lessonNumber}`, {"date": date}, { headers: header, responseType: 'text' as 'json'})
    .subscribe(
        data => {
            this.ns.show('Successfully booked your lesson!');
        },
        error => {
            this.ns.show('Error! Booking failed.');
            console.error(error);
        }
    );
    }
   
}
