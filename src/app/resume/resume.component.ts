import { Component } from "@angular/core";
import { fadeLeftContainer, fadeLeft } from '../general.animatinons';

@Component({
    selector: 'resume-screen',
    templateUrl: 'resume.component.html',
    host: {class: 'resume-screen'},
    animations: [fadeLeftContainer, fadeLeft]
})
export class ResumeScreen {

    public items = [
        {
            title: 'Software Developer',
            location: 'John Hancock (Manulife), Investment Analytics',
            description: 'Fullstack-ish developer working in Angular 2 and SQL Server. Built a webapp ecosystem from the ground up consisting of apps for internal analytics delivery. These apps allow internal users to respond to and interact with our analytics. Developed apps for: identifying and delivering marketing leads using an analytics model based on financial advisor activity, managing financial advisor profiles and the Sales team\'s target advisors, analyzing JH mutual funds, understanding marketing KPIs, and managing basic JH mutual fund information and history. Built a continuous integration framework with automated Selenium testing, data integrity checks, and app user/error analysis. I manage a database instance, where I\'m responsible for maintaining and improving performance, replication, and data integrity.',
            startDate: 'Jan 2020',
            endDate: 'Present'
        },
        {
            title: 'Software Developer',
            location: 'Composable Analytics',
            description: 'Fullstack developer working in AngularJS, C#, SQL Server. Renovated a significant portion (at least a third) of the entire app\'s UX. The goal was to enhance usability of programatically functional, but visually unusable features. Built performance-tracking and analytics into the app\'s dataflow engine. This was accompanied by visual enancements that displayed a dataflow\'s progress.  Added interactive visualizations, wrote PDF editting and parsing modules, added smaller UI upgrades.',
            startDate: 'May 2018',
            endDate: 'Dec 2019'
        },
        {
            title: 'B.S. Neuroscience',
            location: 'Brandeis University, Magna Cum Laude',
            description: 'Mostly neuroscience, focusing on the computational and systems aspects. A bit of biochem and psychology too. Lots of volleyball in my free time. Repeatedly attempted graphic design, repeatedly gave up.',
            startDate: 'Sep 2014',
            endDate: 'Dec 2017'
        },
    ];
}