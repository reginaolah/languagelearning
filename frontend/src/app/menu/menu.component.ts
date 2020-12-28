import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  ngOnInit(): void {
  }

  isSignedIn$: Observable<boolean>;

	constructor(protected as: AuthService) {
		this.isSignedIn$ = as.isSignedIn();
	}

	signout(): void {
		this.as.signout();
	}
  title = 'Italki Clone';

  @ViewChild('stickyMenu') menuElement: ElementRef;

  stickywhite: boolean = false;
  sticky: boolean = true;
  transparentlogo: boolean = true;
  whitelogo: boolean = false;

  elementPosition: any;
  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll < 510){
        this.stickywhite = false;
        this.whitelogo = false;
        this.transparentlogo = true;
      }
      if(windowScroll >= 510){
        this.stickywhite = true;
        this.whitelogo = true;
        this.transparentlogo = false;
      }
      else if(windowScroll <this.elementPosition){
        this.stickywhite = false;
        this.whitelogo = false;
        this.transparentlogo = true;
      }
      else {
        this.stickywhite = false;
        this.whitelogo = false;
        this.transparentlogo = true;
      }
    }
}
