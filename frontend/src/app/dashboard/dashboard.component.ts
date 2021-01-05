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
import { LessonService } from '../core/services/lesson.service';
import { Lesson } from '../core/interfaces/lesson.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User = null;
  updateUser = false;
  public updateUserForm: FormGroup;

  lessons = null;
  public updateLessonForm: FormGroup;
  lessonPrice: number;
  lessonTitle: string;
  lessonLanguage: number;

  updateLanguages = false;
  allLanguages = [];
  newLanguages: Array<number> = [];

  allHomeworks = [];
  homeworkCode = '';
  newHomework: Homework = null;
  title: string;
  name: string;
  description: string;

  studentLessons = [];

  myControl = new FormControl();

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public us: UserService,
    public sls: StudentlessonService,
    public ls: LanguageService,
    public hs: HomeworkService,
    public les: LessonService,
    public dialog: MatDialog
  ) {
    this.updateUserForm = this.formBuilder.group({
      username: [null],
      password: [null],
      email: [null],
      first_name: [null],
      last_name: [null],
      country: [null],
      type: [null],
      is_native: [null],
    });
    this.updateLessonForm = this.formBuilder.group({
      price: [null],
      title: [null],
    });
  }

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
    this.sls.getLessons().then((res) => {
      this.studentLessons = res;
      console.log(res);
    });
  }

  dateConverter(wrongDate): String {
    let date = new Date(wrongDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    return year + '/' + month + '/' + dt;
  }

  updateUserData(form: FormGroup) {
    const data = Object.keys(<User>form.value).reduce((r, e) => {
      if (<User>form.value[e] !== null) {
        r[e] = <User>form.value[e];
      }
      return r;
    }, {});
    console.log(data);
    this.updateUserHandler();
    this.us.updateUser(<User>data);
  }

  getLessonLanguage(code: number): String {
    for (let language of this.allLanguages) {
      if (language.id === code) {
        return language.language;
      }
    }
  }

  onDeleteStudentlessonHandler(id: number) {
    console.log(id);
    this.sls.deleteStudentlesson(id);
  }

  onDeleteLessonHandler(id: number) {
    this.les.deleteLesson(id);
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

  openNewLessonDialog(): void {
    const dialogRef = this.dialog.open(NewLessonDialogComponent, {
      width: '250px',
      data: {
        price: this.lessonPrice,
        title: this.lessonTitle,
        lesson_language: this.lessonLanguage,
        languages: this.allLanguages,
      },
    });

    dialogRef.afterClosed().subscribe((result: Lesson) => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.les.newLesson(result);
      }

      console.log(result);
    });
  }

  openHomeWorkDialog(hw: Homework): void {
    console.log(hw);
    const dialogRef = this.dialog.open(ShowHomeWorkDialogComponent, {
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

  openUpdateLessonDialog(lesson: Lesson): void {
    const dialogRef = this.dialog.open(UpdateLessonDialogComponent, {
      width: '250px',
      data: {
        id: lesson.id,
        price: lesson.price,
        title: lesson.title,
      },
    });

    dialogRef.afterClosed().subscribe((result: Lesson) => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.les.updateLesson(result.id, result);
      }

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

@Component({
  selector: 'new-lesson-dialog',
  templateUrl: 'new-lesson-dialog.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class NewLessonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewLessonDialogComponent>,
    public ls: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: Lesson
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'update-lesson-dialog',
  templateUrl: 'update-lesson-dialog.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class UpdateLessonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateLessonDialogComponent>,
    public ls: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: Lesson
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
export class ShowHomeWorkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowHomeWorkDialogComponent>,
    public hs: HomeworkService,
    @Inject(MAT_DIALOG_DATA) public data: Homework
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
