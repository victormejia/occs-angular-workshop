import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HackerListComponent } from './hacker-list/hacker-list.component';
import { HackerComponent } from './hacker/hacker.component';
import { HackerSearchComponent } from './hacker-search/hacker-search.component';
import { HackerService } from './core/services/hacker.service';
import { TextOnlyDirective } from './core/directives/text-only.directive';
import { ShortDatePipe } from './core/pipes/short-date.pipe';
import { StatusComponent } from './status/status.component';
import { HackerDetailComponent } from './hacker-detail/hacker-detail.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './core/reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HackerListComponent,
    HackerComponent,
    HackerSearchComponent,
    TextOnlyDirective,
    ShortDatePipe,
    StatusComponent,
    HackerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [HackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
