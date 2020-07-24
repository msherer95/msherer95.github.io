import { trigger, transition, query, animate, style, state, animateChild, stagger, group } from '@angular/animations';
 
export const homeScreenAnimation = trigger('homeScreenAnimation', [
    transition('* <=> void', [
        query('@imMark', animateChild()),
        group([
            query('@subtitle', animateChild()),
            query('@logo', animateChild())
        ])
    ])
]);

export const imMark = trigger('imMark', [
    state('void', style({opacity: 0, marginLeft: '-5px'})),
    state('*', style({opacity: 1, marginLeft: '0'})),
    transition('* <=> void', animate('250ms 600ms'))
]);

export const logo = trigger('logo', [
    state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
    state('*', style({ opacity: 1, transform: 'none' })),
    transition('* <=> void', animate('200ms 400ms'))
]);

export const subtitle = trigger('subtitle', [
    state('void', style({opacity: 0, transform: 'translateY(-10px)'})),
    state('*', style({opacity: 1, transform: 'none'})),
    transition('* <=> void', animate('200ms 400ms'))
]);