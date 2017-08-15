import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerSearchComponent } from './hacker-search.component';

describe('HackerSearchComponent', () => {
  let component: HackerSearchComponent;
  let fixture: ComponentFixture<HackerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
