import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home } from 'src/home/home.component';
import { AboutScreen } from './about/about.component';
import { ResumeScreen } from './resume/resume.component';
import { BlogScreen } from './blog/blog.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: AboutScreen },
  { path: 'resume', component: ResumeScreen },
  { path: 'blog', component: BlogScreen },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
