import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AnonymGuard implements CanActivate {

    constructor(
        private router: Router,
        protected as: AuthService
    ) { }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.as.isSignedIn().pipe(
            take(1),
            map(s => !(!!s)),
            tap(loggedOut => {
                if (!loggedOut) {
                    console.error('Hozzáférés megtagadva!');
                    this.router.navigate(['/404']);
                    return false;
                }
                else {
                    return true;
                }
            })
        );
    }

}


/*
canActivate(): boolean {
        let state: boolean = false;
        this.as.isLoggedIn().pipe(take(1)).subscribe((s: boolean) => {
            state = !s
            
        });
        if (state) {
            return true;
        }
        else {
            this.router.navigate(['/issues/open']);
            return false;
        }
    }
*/