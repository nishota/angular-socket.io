import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDivComponent } from './submit-div.component';

describe('SubmitDivComponent', () => {
  let component: SubmitDivComponent;
  let fixture: ComponentFixture<SubmitDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
