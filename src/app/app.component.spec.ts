import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Language, Theme } from './shared/types/Settings';
import { SharedModule } from './shared/modules/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          initialState: {
            settings: {
              theme: Theme.LIGHT,
              language: Language.ENGLISH,
            },
            ui: {
              sideMenu: {
                show: 'hidden',
              },
              loadingSpinner: {
                show: false,
              },
            },
          },
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should initialize settings and uiController with default values', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    expect(app.settings).toEqual({
      theme: Theme.LIGHT,
      language: Language.ENGLISH,
    });
    expect(app.uiController).toEqual({
      sideMenu: {
        show: 'hidden',
      },
      loadingSpinner: {
        show: false,
      },
    });
  });

});
