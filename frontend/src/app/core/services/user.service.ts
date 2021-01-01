import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { LanguageArray } from '../interfaces/languageArray.interface';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //user$ = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) {}

  async getProfile(): Promise<User> {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    console.log(`Bearer ${localStorage.getItem('token')}`);
    const user: User = await this.http
      .post<User>(`${baseUrl}/users/profile`, '', { headers: header })
      .toPromise();
    return user;
  }

  setLanguages(languages: LanguageArray) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .patch<LanguageArray>(`${baseUrl}/users/updatelanguage`, languages, { headers: header })
      .subscribe(
        (data) => {
          this.ns.show('Chosen languages successfully changed!');
        },
        (error) => {
          this.ns.show('ERROR!');
          console.error(error);
        }
      );
  }

  updateUser(user: User) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .patch<User>(`${baseUrl}/users/update`, user, { headers: header })
      .subscribe(
        (data) => {
          this.ns.show('User data successfully changed!');
        },
        (error) => {
          this.ns.show('ERROR!');
          console.error(error);
        }
      );
  }

}