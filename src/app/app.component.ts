import { Component, VERSION } from '@angular/core';
import { interval , Subject, Observable, fromEvent } from 'rxjs';
import {switchMap,concatMap,mergeMap,  map, take, takeUntil} from 'rxjs/operators';
import {OnDestroy} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {
  name = 'Angular ' + VERSION.major;
  private destroy$ = new Subject();
  clickObservable$: Observable<Event> = fromEvent(document,'click');

  constructor() {
    this.testSwitchMap()
  }


  /* Whenever a new value is emmited by the source observable, 
  the inner obs will be unsubribed and newly subscribed */
  public testSwitchMap() {
    // const s1$ = interval(6000).pipe((map(ev => console.log("f" + ev))), take (7), takeUntil(this.destroy$));
    const s2$ = interval(3000).pipe((map(ev => console.log("switch" + ev))), take (10), takeUntil(this.destroy$));

     this.clickObservable$
     .pipe(
       switchMap(sourceValue => {
        return s2$;
      }), 
      takeUntil(this.destroy$))
      .subscribe();
  }

  public testConcathMap() {
    const s2$ = interval(3000).pipe((map(ev => console.log("concat" + ev))), take (10), takeUntil(this.destroy$));

     this.clickObservable$
     .pipe(
       concatMap(sourceValue => {
        return s2$;
      }), 
      takeUntil(this.destroy$))
      .subscribe();
  }


    public testMergeMap() {
    const s2$ = interval(3000).pipe((map(ev => console.log("merge" + ev))), take (10), takeUntil(this.destroy$));

     this.clickObservable$
     .pipe(
       mergeMap(sourceValue => {
        return s2$;
      }), 
      takeUntil(this.destroy$))
      .subscribe();
  }


  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
