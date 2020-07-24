import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToolbarService } from './toolbar.service';
import { toolbarAnimation, toolbarBtn, logoBtn } from 'src/app/toolbar.animations';

@Component({
    selector: 'toolbar-component',
    templateUrl: 'toolbar.component.html',
    host: {class: 'toolbar', '[class.home-page]': 'isHome()', '[@toolbarAnimation]': 'true'},
    animations: [
        toolbarAnimation,
        toolbarBtn,
        logoBtn
    ]
})
export class Toolbar {

    constructor(
        private router: Router,
        private toolbarService: ToolbarService
    ) { }

    public navigate(url: string): void {
        this.toolbarService.update();
        this.router.navigateByUrl(url);
    }

    public isHome(): boolean {
        return this.router.url.includes('home');
    }
}