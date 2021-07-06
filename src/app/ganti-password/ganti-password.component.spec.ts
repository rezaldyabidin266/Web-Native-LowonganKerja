import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GantiPasswordComponent } from './ganti-password.component';

describe('GantiPasswordComponent', () => {
  let component: GantiPasswordComponent;
  let fixture: ComponentFixture<GantiPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GantiPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GantiPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
