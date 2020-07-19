import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Home } from 'src/home/home.component';
import { Toolbar } from 'src/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Toolbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
