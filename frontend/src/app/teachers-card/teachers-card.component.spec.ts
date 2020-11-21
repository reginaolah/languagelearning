import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersCardComponent } from './teachers-card.component';

describe('TeachersCardComponent', () => {
  let component: TeachersCardComponent;
  let fixture: ComponentFixture<TeachersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
