import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Inject,
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
import { Homework } from '../core/interfaces/homework.interface';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { StudentlessonService } from '../core/services/studentlesson.service';
import { LanguageService } from '../core/services/language.service';
import { HomeworkService } from '../core/services/homework.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User = null;
  lessons = null;
  updateLanguages = false;
  updateUser = false;
  allLanguages = [];
  newLanguages: Array<number> = [];

  homeworkCode = '';
  newHomework: Homework = null;
  title: string;
  name: string;
  description: string;

  myControl = new FormControl();

  constructor(
    public router: Router,
    public us: UserService,
    public sls: StudentlessonService,
    public ls: LanguageService,
    public hs: HomeworkService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.us.getProfile().then((res) => {
      this.user = res;
      for (let language of this.user.languages) {
        this.newLanguages.push(language.id);
      }
      console.log(this.user);
    });
    this.ls.getLanguages().then((res) => {
      this.allLanguages = res;
      console.log(this.allLanguages);
    });
  }

  getLessonLanguage(code: number): String {
    for (let language of this.allLanguages) {
      if (language.id === code) {
        return language.language;
      }
    }
  }

  alreadyChecked(code: number): boolean {
    for (let language of this.user.languages) {
      if (language.id === code) {
        return true;
      }
    }
    return false;
  }

  changeCheckHandler(code: number): void {
    console.log('before ' + this.newLanguages);
    if (this.newLanguages.includes(code)) {
      this.newLanguages.forEach((language, i) => {
        if (language === code) {
          this.newLanguages.splice(i, 1);
        }
      });
    } else {
      this.newLanguages.push(code);
    }

    console.log('after ' + this.newLanguages);
  }

  updateLanguagesHandler(): void {
    if (this.updateLanguages) {
      this.us.updateLanguages({ languages: this.newLanguages });
    } else {
      this.updateLanguages = !this.updateLanguages;
    }
  }

  updateUserHandler(): void {
    this.updateUser = !this.updateUser;
  }

  cancelActionsHandler(): void {
    this.updateLanguages = false;
    this.updateUser = false;
  }

  onHomeworkCodeChangeHandler(e): void {
    console.log(e.target.value);
  }

  onGetHomeworkHandler(): void {
    //this.hs.getHomeworkByUuid(this.homeworkCode);
    console.log(this.homeworkCode);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewHomeWorkDialogComponent, {
      width: '250px',
      data: {
        title: this.title,
        name: this.name,
        description: this.description,
      },
    });

    dialogRef.afterClosed().subscribe((result: Homework) => {
      console.log('The dialog was closed');
      //this.animal = result;
      this.hs.postNewHomework(result);
      console.log(result);
    });
  }
}

@Component({
  selector: 'new-homework-dialog',
  templateUrl: 'new-homework-dialog.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class NewHomeWorkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewHomeWorkDialogComponent>,
    public hs: HomeworkService,
    @Inject(MAT_DIALOG_DATA) public data: Homework
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
