import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../core/interfaces/user';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

 
  public signupForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder, 
    protected authService: AuthService, 
    private notificationService: NotificationService
    ) { 
      //Többszörös feliratkozást kerüljük
      this.signupForm = this.formBuilder.group({
        username: [null, Validators.required], 
        email:[null, Validators.required],
        first_name:[null, Validators.required], 
        last_name:[null, Validators.required],
        password: [null, Validators.required],
        role:[null, Validators.required]

      });
    }

    signup(form:FormGroup){
      if(form.valid){
        this.authService.signup(<User>form.value)
      }
      else{
        this.notificationService.show('HIBA! Nem megfelelő adatok')
      }
    }
  }