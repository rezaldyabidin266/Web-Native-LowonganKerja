import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PertanyaanTokenComponent } from './pertanyaan-token.component';

describe('PertanyaanTokenComponent', () => {
  let component: PertanyaanTokenComponent;
  let fixture: ComponentFixture<PertanyaanTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertanyaanTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PertanyaanTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
