import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {filter, map, startWith} from 'rxjs/operators';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  options: string[] = ['English', 'Spanish', 'French', 'Chinese'];
  filteredOptions: Observable<string[]>;

  myControl = new FormControl();

  constructor(public router: Router) { }

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
}