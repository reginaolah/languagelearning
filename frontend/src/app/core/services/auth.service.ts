import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'; 
import {baseUrl} from 'src/environments/environment';
import { User } from '../interfaces/user';
import { NotificationService } from './notification.service';

//allow origin * -gal lehet engedélyezni a rest-hez kapcsolódó szabályokat


@Injectable({
  providedIn: 'root'
})


@Injectable()
export class AuthService {
 
  /*
  private ns: NotificationService;
  isSignin$ = new BehaviorSubject<boolean>(this.hasToken()); //TODO: hasToken()...
     
    constructor() {}
    isSignedIn():Observable<boolean>{
      return this.isSignin$.asObservable();
    }

    
    signin(user: User ):void {
      console.log('bejelentkezes proba');
      localStorage.setItem('token', 'fsdghjfadfsgkoptiwearwer');
      
      this.isSignin$.next(true);
      this.ns.show('Sikeres bejelentkezés!');
      //TODO
    }
    
 */

  private ns: NotificationService;
  private http: HttpClient;
  isSignin$ = new BehaviorSubject<boolean>(this.hasToken()); //TODO: hasToken()...
  
    constructor() {}
    isSignedIn():Observable<boolean>{
      return this.isSignin$.asObservable();
    }

    signin(user: User): void {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': ''
        }),
      }
      this.http.post(`${baseUrl}/signin`, user, httpOptions).subscribe(
        data => {
          console.log(data); // TODO: Use TOKEN from the data POST response.
          localStorage.setItem('token', 'A223wedw34w');
          this.isSignin$.next(true);
          this.ns.show('Sikeres bejelentkezés!');
        },
        error => {
          this.ns.show('HIBA! Bejelentkezés sikertelen!');
          console.error(error);
        }
      );
    }
    

    signout():void {
      localStorage.removeItem('token');
      this.isSignin$.next(false);
      
    }

    protected hasToken(): boolean{
      return !!localStorage.getItem('token');
    }

    //ki kell egészíteni hogy http-n keresztül is meg lehessen kapni a tokent
}