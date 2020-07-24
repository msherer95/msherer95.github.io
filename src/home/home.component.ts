import { Component } from "@angular/core";
import { homeScreenAnimation, logo, imMark, subtitle } from 'src/app/home.animations';

@Component({
    selector: 'home-screen',
    templateUrl: 'home.component.html',
    host: {class: 'home-screen'},
    animations: [
        homeScreenAnimation,
        logo,
        imMark,
        subtitle
    ]
})
export class Home {

}