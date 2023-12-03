import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherDetailComponent } from '../../components/weather-detail/weather-detail.component';
import { ValueFormatDirective } from '../../directives/value-format.directive';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    TranslateModule,
  ],
  declarations: [
    WeatherComponent,
    WeatherDetailComponent,
    ValueFormatDirective
  ],
  exports: []
})
export class WeatherModule { }
