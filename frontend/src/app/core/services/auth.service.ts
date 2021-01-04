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
export class AuthService {

  isSignin$ = new BehaviorSubject<boolean>(this.hasToken());

  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': ''
    }),
    responseType: 'text' as 'json'
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService
  ) { }

    isSignedIn(): Observable<boolean>{
      return this.isSignin$.asObservable();
    }

    signup(user: User ): void {
      this.http.post<User>(`${baseUrl}/users/signup`, user, this.httpOptions).subscribe(
        data => {
          this.ns.show('Successfully signed up!');
          //sign in after sign up
          this.signin(user);
        },
        error => {
          this.ns.show('HIBA! Sign up failed!');
          console.error(error);
        }
      );
    }

    signin(user: User): void {
      this.http.post<User>(`${baseUrl}/users/signin`,user, {responseType: 'json'}).subscribe(
        data => {
          localStorage.setItem('token', data["token"]);
          this.isSignin$.next(true);
          this.ns.show('Successfully signed in!');
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.ns.show('Error! Sign in failed!');
          console.error(error);
        }
      )
    }

    signout(): void {
      localStorage.removeItem('token');
      this.isSignin$.next(false);
      this.ns.show('Sign out successful!')
      this.router.navigate(['/']);
    }

    protected hasToken(): boolean{
      return !!localStorage.getItem('token');
    }

}
