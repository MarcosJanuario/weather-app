import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    TranslateModule
  ],
  declarations: [
    WeatherComponent
  ],
})
export class WeatherModule { }
