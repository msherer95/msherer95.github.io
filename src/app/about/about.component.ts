import { Component } from "@angular/core";
import { fadeLeft, fadeLeftContainer } from '../general.animatinons';

@Component({
    selector: 'about-screen',
    templateUrl: 'about.component.html',
    host: {class: 'about-screen'},
    animations: [fadeLeft, fadeLeftContainer]
})
export class AboutScreen {
    
}