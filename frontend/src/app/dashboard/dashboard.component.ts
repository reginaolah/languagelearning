import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { filter, map, startWith } from 'rxjs/operators';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { StudentlessonService } from '../core/services/studentlesson.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User = null;
  lessons = null;

  myControl = new FormControl();

  constructor(public router: Router, public us: UserService, public sls: StudentlessonService) {}

  ngOnInit(): void {
    this.us.getProfile().then((res) => {
      this.user = res;
      console.log(this.user);
    });
    this.sls.getLessons().then((res) => {
      this.lessons = res;
      console.log(this.lessons);
    });
  }
}
