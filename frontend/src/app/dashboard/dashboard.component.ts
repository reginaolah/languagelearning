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

  allHomeworks = [];
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
    this.hs.getHomeworks().then((res) => {
      this.allHomeworks = res;
      console.log(this.allHomeworks);
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
      this.updateLanguages = !this.updateLanguages;
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
    this.homeworkCode = e.target.value;
  }

  onGetHomeworkHandler(): void {
    this.hs.getHomeworkByUuid(this.homeworkCode).then((home) => {
      this.openHomeWorkDialog(home);
    });
  }

  onDeleteHomeworkHandler(uuid: String) {
    this.hs.deleteHomework(uuid);
  }

  openNewHomeWorkDialog(): void {
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
      if (result) {
        this.hs.postNewHomework(result);
      }

      console.log(result);
    });
  }

  openHomeWorkDialog(hw: Homework): void {
    console.log(hw);
    const dialogRef = this.dialog.open(showHomeWorkDialogComponent, {
      width: '500px',
      height: '300px',
      data: {
        uuid: hw[0].uuid,
        title: hw[0].title,
        name: hw[0].name,
        description: hw[0].description,
        path_to_solution: hw[0].path_to_solution,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
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

@Component({
  selector: 'show-homework-dialog',
  templateUrl: 'show-homework-dialog.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class showHomeWorkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<showHomeWorkDialogComponent>,
    public hs: HomeworkService,
    @Inject(MAT_DIALOG_DATA) public data: Homework
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
