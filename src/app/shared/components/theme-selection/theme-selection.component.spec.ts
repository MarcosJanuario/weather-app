import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ThemeSelectionComponent } from './theme-selection.component';
import { Language, Settings, Theme } from '../../types/Settings';
import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UiController } from '../../types/UiController';
import { SharedModule } from '../../modules/shared.module';
import { updateTheme } from '../../../store/actions/settings.actions';
import { By } from '@angular/platform-browser';
import { UNIT_TEST_INITIAL_SETTINGS, UNIT_TEST_INITIAL_UI } from '../../utils/constants';

describe('ThemeSelectionComponent', () => {
  let component: ThemeSelectionComponent;
  let fixture: ComponentFixture<ThemeSelectionComponent>;
  let store: MockStore<{ settings: Settings; ui: UiController }>;
  const destroy$: Subject<void> = new Subject<void>();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeSelectionComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore({
          initialState: {
            settings: UNIT_TEST_INITIAL_SETTINGS,
            ui: UNIT_TEST_INITIAL_UI,
          },
        })
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected theme when settings change', waitForAsync(() => {
    const mockSettings: Settings = { theme: Theme.DARK, language: Language.ENGLISH };
    store.setState({
      settings: mockSettings,
      ui: UNIT_TEST_INITIAL_UI
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.selectedTheme).toEqual(Theme.DARK);
    });
  }));

  it('should update store when theme is changed', () => {
    spyOn(store, 'dispatch');

    component.selectedTheme = Theme.DARK;
    component.onThemeChanged();

    expect(store.dispatch).toHaveBeenCalledWith(updateTheme({ data: Theme.DARK }));
  });


  it('should have a button to toggle the theme', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('.light-button'));

      expect(button).toBeTruthy();
    });
  }));
});
