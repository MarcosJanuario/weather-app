import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeatherComponent } from './weather.component';
import { Language, Settings, Theme } from '../../types/Settings';
import { UiController } from '../../types/UiController';
import { TranslateModule } from '@ngx-translate/core';

const initialSettings = {
  theme: Theme.LIGHT,
  language: Language.ENGLISH,
};

const initialUi: UiController = {
  sideMenu: {
    show: 'hidden',
  },
  loadingSpinner: {
    show: false,
  },
}

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let store: MockStore<{ settings: Settings; ui: UiController }>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [StoreModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
      providers: [provideMockStore({
        initialState: {
          settings: initialSettings,
          ui: initialUi,
        },
      })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDarkMode based on theme in settings', () => {
    expect(component.isDarkMode).toBe(false);

    const newSettings: Settings = {
      theme: Theme.DARK,
      language: Language.ENGLISH,
    };

    store.setState({
      settings: newSettings,
      ui: initialUi
    });

    fixture.detectChanges();

    expect(component.isDarkMode).toBe(true);
  });
});
