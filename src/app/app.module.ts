import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Home } from 'src/home/home.component';
import { Toolbar } from 'src/toolbar/toolbar.component';
import { AboutScreen } from './about/about.component';
import { ResumeScreen } from './resume/resume.component';
import { BlogScreen } from './blog/blog.component';
import { SafeUrl } from './safe-url.pipe';
import { ToolbarService } from 'src/toolbar/toolbar.service';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Toolbar,
    AboutScreen,
    ResumeScreen,
    BlogScreen,
    SafeUrl,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
