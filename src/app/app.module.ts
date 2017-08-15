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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HackerListComponent,
    HackerComponent,
    HackerSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
