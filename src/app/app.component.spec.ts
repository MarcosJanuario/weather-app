import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/modules/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UNIT_TEST_INITIAL_SETTINGS, UNIT_TEST_INITIAL_UI } from './shared/utils/constants';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          initialState: {
            settings: UNIT_TEST_INITIAL_SETTINGS,
            ui: UNIT_TEST_INITIAL_UI,
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

    expect(app.settings).toEqual(UNIT_TEST_INITIAL_SETTINGS);
    expect(app.uiController).toEqual(UNIT_TEST_INITIAL_UI);
  });

});
