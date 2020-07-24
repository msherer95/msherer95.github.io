import { trigger, transition, query, animate, style, state, animateChild, stagger, group } from '@angular/animations';

export const toolbarAnimation = trigger('toolbarAnimation', [
    transition('void <=> *', [
        query('@toolbarBtn', [
            stagger(100, animateChild())
        ])
    ])
]);

export const toolbarBtn = trigger('toolbarBtn', [
    state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
    state('*', style({ opacity: 1, transform: 'none' })),
    transition('void <=> *', animate('250ms 1800ms'))
]);

export const logoBtn = trigger('logoBtn', [
    state('void', style({opacity: 0, transform: 'scale(0.8) rotate(60deg)'})),
    state('*', style({opacity: 1, transform: 'none'})),
    transition('void <=> *', animate('200ms'))
]);;