import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'signin', component: AuthComponent},
  {path: 'signup', component:AuthComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'teachers', component:TeachersComponent},
  { path: '404', component: PagenotfoundComponent },
		{ path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
