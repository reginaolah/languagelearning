import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { Language } from '../interfaces/language.interface';
import { LanguageService } from './language.service';


@Injectable({
  providedIn: 'root'
})
export class TeachersService {
    teachers$: User[] =[];
    //teachers$ = new BehaviorSubject<User[]>([]);
    
    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

/*
    getTeachers(): void {
        this.teachers$ = new BehaviorSubject<User[]>(null);
        let selectedLanguage = localStorage.getItem("selectedLanguage");
        console.log(selectedLanguage);

        const header = new HttpHeaders().set(
            'Content-type', 'application/json'
        );
        this.http.get<User[]>(`${baseUrl}/users/teachers/${selectedLanguage}`, {headers: header})
            .subscribe(i => {
                this.teachers$.next(i);
            });
    }
    */
    

    async getTeachers(): Promise<User[]> {
        let selectedLanguage = localStorage.getItem("selectedLanguage");
        console.log(selectedLanguage);
        const header = new HttpHeaders().set(
            'Content-type', 'application/json'
        );
        const teachers: User[] = await this.http.get<User[]>(`${baseUrl}/users/teachers/${selectedLanguage}`, {headers: header}).toPromise();
        this.teachers$ = teachers;
        console.log(teachers);
        return teachers;
    }

}
