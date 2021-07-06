import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPengalamanComponent } from './add-pengalaman.component';

describe('AddPengalamanComponent', () => {
  let component: AddPengalamanComponent;
  let fixture: ComponentFixture<AddPengalamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPengalamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPengalamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
