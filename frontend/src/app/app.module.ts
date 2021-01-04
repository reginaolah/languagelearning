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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { AuthGuard } from './core/guards/auth.guard';
import { AnonymGuard } from './core/guards/anonym.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { TeachersCardComponent } from './teachers-card/teachers-card.component';
import { LessonsComponent } from './lessons/lessons.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { DashboardComponent, NewHomeWorkDialogComponent, ShowHomeWorkDialogComponent, NewLessonDialogComponent } from './dashboard/dashboard.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SimplebarAngularModule } from 'simplebar-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CarouselModule} from 'primeng/carousel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    MenuComponent,
    TeachersCardComponent,
    LessonsComponent,
    PagenotfoundComponent,
    DashboardComponent,
    TeachersComponent,
    NewHomeWorkDialogComponent,
    ShowHomeWorkDialogComponent,
    NewLessonDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
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
    MatPasswordStrengthModule,
    MatCheckboxModule,
    SimplebarAngularModule,
    MatGridListModule,
    CarouselModule,
    MatDatepickerModule,
    CalendarModule,
    MatNativeDateModule, 
    MatDatepickerModule,
    MatNativeDateModule 
    
  ],
  providers: [AuthGuard, AnonymGuard,  MatDatepickerModule, MatNativeDateModule ],
  bootstrap: [AppComponent],
})
export class AppModule {}
