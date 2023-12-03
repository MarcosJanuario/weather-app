import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './store/reducers/settings.reducer';
import { WeatherService } from './shared/services/weather.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { weatherReducer } from './store/reducers/weather.reducer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InputSearchComponent } from './shared/components/input-search/input-search.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { uiReducer } from './store/reducers/ui.reducer';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ThemeSelectionComponent } from './shared/components/theme-selection/theme-selection.component';
import { FormsModule } from '@angular/forms';
import { LanguageSelectionComponent } from './shared/components/language-selection/language-selection.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    InputSearchComponent,
    SideMenuComponent,
    LoadingSpinnerComponent,
    ThemeSelectionComponent,
    LanguageSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      settings: settingsReducer,
      weather: weatherReducer,
      ui: uiReducer
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [ HttpClient ]
      },
      defaultLanguage: 'en'
    }),
    HeaderComponent,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
