import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { baseUrl } from 'src/environments/environment';
import { Language } from '../interfaces/language.interface';
import { _getOptionScrollPosition } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
    languages$ = new BehaviorSubject<Language[]>([]);
    options$: string[] =[];
    language: string;

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    async getLanguages(): Promise<Language[]> {
       
        const header = new HttpHeaders().set(
            'Content-type', 'application/json'
        );

        const languages: Language[] = await this.http.get<Language[]>(`${baseUrl}/languages`, {headers: header}).toPromise();
        console.log(languages)
        return languages;               
    }

}
