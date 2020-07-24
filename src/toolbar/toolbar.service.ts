import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ToolbarService {

    public update$ = new Subject<void>();

    public update(): void {
        this.update$.next();
    }
}