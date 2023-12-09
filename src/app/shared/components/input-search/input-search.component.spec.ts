import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputSearchComponent } from './input-search.component';
import { Store, StoreModule } from '@ngrx/store';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Settings } from '../../types/Settings';
import { By } from '@angular/platform-browser';
import { UNIT_TEST_INITIAL_SETTINGS, UNIT_TEST_INITIAL_UI } from '../../utils/constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;
  let store: Store<{ settings: Settings }>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(waitForAsync(() => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);

    TestBed.configureTestingModule({
      declarations: [InputSearchComponent],
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        provideMockStore({
          initialState: {
            settings: UNIT_TEST_INITIAL_SETTINGS,
            ui: UNIT_TEST_INITIAL_UI,
          },
        }),
      ],
    });

    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    const mockSettings: Settings = UNIT_TEST_INITIAL_SETTINGS;
    spyOn(store, 'select').and.returnValue(of(mockSettings));

    fixture.detectChanges();
  }));



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update isDarkMode only based on the theme from settings', () => {
    expect(component.isDarkMode).toBeFalse();

    store.dispatch({ type: 'whatever-other-action-name' });
    fixture.detectChanges();

    expect(component.isDarkMode).toBeFalse(); // ASSUMING default heme is LIGHT
  });

  it('should update inputValue when onInputChange is called', async(() => {
    const inputElement = fixture.debugElement.query(By.css('#city-input')).nativeElement;

    inputElement.value = 'New York';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.inputValue).toBe('New York');
    });
  }));


  it('should disable the search button when inputValue is empty', () => {
    component.inputValue = '';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBeTrue();
  });

  it('should enable the search button when inputValue is not empty', () => {
    component.inputValue = 'Berlin';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBeFalse();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
