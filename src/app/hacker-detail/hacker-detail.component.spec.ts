import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerDetailComponent } from './hacker-detail.component';

describe('HackerDetailComponent', () => {
  let component: HackerDetailComponent;
  let fixture: ComponentFixture<HackerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
