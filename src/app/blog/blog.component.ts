import { Component } from "@angular/core";
import { Toolbar } from 'src/toolbar/toolbar.component';
import { ToolbarService } from 'src/toolbar/toolbar.service';
import { growContainer, grow } from '../general.animatinons';

@Component({
    selector: 'blog-screen',
    templateUrl: 'blog.component.html',
    host: {class: 'blog-screen', '[@growContainer]': 'true'},
    animations: [growContainer, grow]
})
export class BlogScreen {

    public posts = [
        {
            title: 'StreamDB',
            description: 'A series of my attempts to create a streaming DBMS. It includes some theory, rambling discussions on my implementation thoughts, and implementation details.',
            postUrl: '/assets/blog/streamdb/book/index.html',
            imgUrl: '/assets/db_logo.svg'
        }
    ];

    public postUrl: string = null;

    constructor( 
        private toolbarService: ToolbarService
    ) { }

    public ngOnInit(): void {
        this.toolbarService.update$.subscribe(() => this.postUrl = null);
    }
}