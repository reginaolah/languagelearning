import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../core/interfaces/user';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public signinForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder, 
    protected authService: AuthService, 
    private notificationService: NotificationService
    ) { 
      //Többszörös feliratkozást kerüljük
      this.signinForm = this.formBuilder.group({
        username: [null, Validators.required], 
        password: [null, Validators.required]
      });
    }

    signin(form:FormGroup){
      if(form.valid){
        this.authService.signin(<User>form.value)
      }
      else{
        this.notificationService.show('HIBA! Nem megfelelő adatok')
      }
    }



}
