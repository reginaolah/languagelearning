import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/interfaces/user.interface';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';

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
        username: [null],
        password: [null],
        email:[null],
        first_name:[null], 
        last_name:[null],
        role:[null]
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