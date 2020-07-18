import { Component, OnInit } from '@angular/core';
import {Subject, zip, combineLatest, forkJoin, interval} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-obs-combination',
  templateUrl: './obs-combination.component.html',
  styleUrls: ['./obs-combination.component.css']
})
export class ObsCombinationComponent implements OnInit {
  
  color$ = new Subject();
  logo$ = new Subject();

  constructor() { }

  ngOnInit() {
    //this.testForkJoin();
    //this.generateTShirts();
  }

  /*
  The observables will wait for each other will new values are emmited from both sources;
  The values are taken in order. That means that if an observable emits multiple values while waiting for the other the change its value,
  after both have emmited new values, it won't be used the newest generated value from the first observale, but the first gnerated value that was still not used.

  */
  testZip() {
    zip(this.logo$, this.color$).subscribe(([logo, color]) => console.log(logo + ' with ' + color ))
  }

  /*
    Once each source emits one value, the obs won't wait one for another. The combination will be done with the latest emitted value from each source.
  */
  testCombineLatest() {
    combineLatest(this.logo$, this.color$).subscribe(([logo, color]) => console.log(logo + ' with ' + color ))
  }

  /* There is a master slave relationship. Color, which is the master. will dictate when the console log happens. At start, it will wait till logo emits, but after that whenever the color change, the computation will take place.  */
  testWithLatestFrom() {
    this.color$.pipe(withLatestFrom(this.logo$)).subscribe(([logo, color]) => console.log(logo + ' with ' + color ))
  }

  /* The computation will occur after both observables are completed */
  testForkJoin() {
    forkJoin(this.logo$, this.color$).subscribe(([logo, color]) => console.log(logo + ' with ' + color ))
  }

  generateTShirts() {
    const i1 = interval(6000);
    const i2 =interval(10000);
    i1.subscribe((nr) => {
      console.log('color ' + nr);
      this.color$.next('color'+ nr)
      });

    i2.subscribe((nr) => {
       console.log('logo ' + nr);
      this.logo$.next('logo' + nr)
    });


    /*interval(30000).subscribe((nr) => {
      this.color$.complete();
      this.logo$.complete();
    });*/
  }

}