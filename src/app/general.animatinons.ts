import { trigger, transition, query, animate, style, state, animateChild, stagger, group } from '@angular/animations';

export const fadeLeftContainer = trigger('fadeLeftContainer', [
    transition('void <=> *', [
        query('@fadeLeft', [
            stagger(100, animateChild())
        ])
    ])
]);

export const fadeLeft = trigger('fadeLeft', [
    state('void', style({opacity: 0, transform: 'translateX(-10px)'})),
    state('*', style({opacity: 1, transform: 'none'})),
    transition('void <=> *', animate('250ms'))
]);

export const growContainer = trigger('growContainer', [
    transition('void => *', [
        query('@grow', [
            stagger(100, animateChild())
        ])
    ])
])

export const grow = trigger('grow', [
    state('void', style({opacity: 0, transform: 'scale(0.93)'})),
    state('*', style({opacity: 1, transform: 'none'})),
    transition('void => *', animate('300ms'))
])