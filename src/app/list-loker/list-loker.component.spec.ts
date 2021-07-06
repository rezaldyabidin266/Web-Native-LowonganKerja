import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLokerComponent } from './list-loker.component';

describe('ListLokerComponent', () => {
  let component: ListLokerComponent;
  let fixture: ComponentFixture<ListLokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
