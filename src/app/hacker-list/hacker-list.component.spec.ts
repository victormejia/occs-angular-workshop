import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerListComponent } from './hacker-list.component';

describe('HackerListComponent', () => {
  let component: HackerListComponent;
  let fixture: ComponentFixture<HackerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
