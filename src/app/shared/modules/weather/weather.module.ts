import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { InputComponent } from '../../components/input/input.component';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule
  ],
  declarations: [
    WeatherComponent,
    InputComponent
  ],
})
export class WeatherModule { }
