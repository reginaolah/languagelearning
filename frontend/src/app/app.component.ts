import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {filter, map, startWith} from 'rxjs/operators';
import { User } from './core/interfaces/user';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  ngOnInit(): void {
   this.filteredOptions = this.myControl.valueChanges.pipe(
     startWith(''), 
     map(value => this._filter(value))
   );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => 
      option.toLowerCase().includes(filterValue)
      );
  }

  options: string[] = ['English', 'Spanish', 'French', 'Chinese'];
  filteredOptions: Observable<string[]>;

  myControl = new FormControl();
}


//ng build prod elkészíti és az index.html lesz benne amit a CI-nak majd be lehet állítani 