import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './store/reducers/settings.reducer';
import { WeatherService } from './shared/services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { weatherReducer } from './store/reducers/weather.reducer';
import { uiReducer } from './store/reducers/ui.reducer';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      settings: settingsReducer,
      weather: weatherReducer,
      ui: uiReducer
    }),
    SharedModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule { }
