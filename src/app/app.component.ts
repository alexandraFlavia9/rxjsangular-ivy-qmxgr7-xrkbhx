import { Component, VERSION } from '@angular/core';
import { interval , Subject} from 'rxjs';
import {switchMap, map, take, takeUntil} from 'rxjs/operators';
import {OnDestroy} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {
  name = 'Angular ' + VERSION.major;
  private destroy$ = new Subject();
  constructor() {
    this.testSwitchMap()
  }


  /* Whenever a new value is emmited by the source observable, 
  the inner obs will be unsubribed and newly subscribed */
  public testSwitchMap() {
    const s1$ = interval(6000).pipe((map(ev => console.log("f" + ev))), take (7), takeUntil(this.destroy$));
    const s2$ = interval(1000).pipe((map(ev => console.log("s" + ev))), take (10), takeUntil(this.destroy$));

     s1$.pipe(switchMap(sourceValue => {
        return s2$;
    })).subscribe();
  }


  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
