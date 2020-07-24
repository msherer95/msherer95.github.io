import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    title = 'personal-site';
}
