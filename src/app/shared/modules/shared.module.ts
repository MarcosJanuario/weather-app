import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { InputSearchComponent } from '../components/input-search/input-search.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { ThemeSelectionComponent } from '../components/theme-selection/theme-selection.component';
import { LanguageSelectionComponent } from '../components/language-selection/language-selection.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HeaderComponent,
    InputSearchComponent,
    SideMenuComponent,
    LoadingSpinnerComponent,
    ThemeSelectionComponent,
    LanguageSelectionComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [ HttpClient ]
      },
      defaultLanguage: 'en'
    })
  ],
  exports: [
    HeaderComponent,
    InputSearchComponent,
    SideMenuComponent,
    LoadingSpinnerComponent,
    ThemeSelectionComponent,
    LanguageSelectionComponent,
  ],
})
export class SharedModule {}
