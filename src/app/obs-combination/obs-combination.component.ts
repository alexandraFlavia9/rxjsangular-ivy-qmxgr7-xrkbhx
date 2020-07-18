import { Component, OnInit } from '@angular/core';
import {Subject, zip, interval} from 'rxjs';

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
    //this.testZip();
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

  generateTShirts() {
    interval(6000).subscribe((nr) => {
      console.log('color ' + nr);
      this.color$.next('color'+ nr)
      });

    interval(10000).subscribe((nr) => {
       console.log('logo ' + nr);
      this.logo$.next('logo' + nr)
    });
  }

}