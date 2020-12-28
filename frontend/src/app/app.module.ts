import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { AppRoutingModule } from './app-routing.module';
import {MatRadioModule} from '@angular/material/radio'; 

import { AuthGuard } from './core/guards/auth.guard';
import { AnonymGuard } from './core/guards/anonym.guard';
import {MatTabsModule} from '@angular/material/tabs'; 
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { TeachersCardComponent } from './teachers-card/teachers-card.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { LanguageCardComponent } from './language-card/language-card.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonComponent } from './lessons/lesson/lesson.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeachersComponent } from './teachers/teachers.component';

@NgModule({
	declarations: [
	AppComponent,
	AuthComponent,
		SigninComponent,
		SignupComponent,
    MenuComponent,
    TeachersCardComponent,
    StudentCardComponent,
    LanguageCardComponent,
    LessonsComponent,
	LessonComponent,
	PagenotfoundComponent,
	DashboardComponent,
	TeachersComponent
  	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatSidenavModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatChipsModule,
		MatTooltipModule,
		MatDialogModule,
		MatIconModule,
		MatListModule,
		MatRippleModule,
		MatExpansionModule,
		MatSnackBarModule,
		AppRoutingModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatTabsModule,
		MatPasswordStrengthModule
	],
	providers: [
		AuthGuard,
		AnonymGuard
	],
	bootstrap: [AppComponent]
})
 
export class AppModule { }
