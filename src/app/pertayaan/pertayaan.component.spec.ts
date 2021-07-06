import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PertayaanComponent } from './pertayaan.component';

describe('PertayaanComponent', () => {
  let component: PertayaanComponent;
  let fixture: ComponentFixture<PertayaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertayaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PertayaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
