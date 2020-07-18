import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ObsCombinationComponent } from './obs-combination/obs-combination.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ObsCombinationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
