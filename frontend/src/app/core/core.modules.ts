import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatSnackBarModule
	],
	providers: [
		AuthService,
		NotificationService
	]
})
export class CoreModule { }