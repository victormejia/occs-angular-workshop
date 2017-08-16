import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HackerComponent } from './hacker.component';
import { ShortDatePipe } from '../core/pipes/short-date.pipe';

@Component({
  template: `
    <tr app-hacker [hacker]="testHacker"></tr>
  `
})
class TestHostComponent {
  testHacker = {
    id: '70dd6f38-fd14-4dfd-bd43-3b07586ce49e',
    name: 'Price',
    dob: '1960-06-01T11:01:12.720Z',
    address: '85066 Ona Shores',
    cityStateZip: 'Cartwrightview, South Carolina 24722',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg',
    phone: '(775) 232-7260',
    statusMessage: 'Use the optical RAM pixel, then you can navigate the online protocol!',
    specialty: 'bypassing pixel',
    ip: '187.154.44.205',
    email: 'Price.Donnelly9_Thompson37@gmail.com',
    password: 'ttRXuJjmsm9NLdG',
    status: 'warning'
  };
}

fdescribe('HackerComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerComponent, TestHostComponent, ShortDatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should render correct amount of table cells', () => {
    fixture.detectChanges();

    const tableCells = fixture.debugElement.queryAll(By.css('td'));
    expect(tableCells.length).toBe(7);
  });

  it('should render correct name', () => {
    fixture.detectChanges();
    const tdName: HTMLElement = fixture.debugElement.queryAll(By.css('td'))[1].nativeElement;

    expect(tdName.textContent).toBe(testHost.testHacker.name);
  });

  it('should render correct address', () => {
    fixture.detectChanges();
    const { address, cityStateZip } = testHost.testHacker;
    const tdAddress: HTMLElement = fixture.debugElement.queryAll(By.css('td'))[3].nativeElement;

    expect(tdAddress.textContent).toBe(`${address} ${cityStateZip}`);
  });

});
