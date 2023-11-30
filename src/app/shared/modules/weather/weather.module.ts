import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule
  ],
  declarations: [
    WeatherComponent
  ],
})
export class WeatherModule { }
