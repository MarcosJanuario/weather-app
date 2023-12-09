import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SideMenuComponent } from './side-menu.component';
import { UiController } from '../../types/UiController';
import { Language, Settings, Theme } from '../../types/Settings';
import { toggleSideMenu } from '../../../store/actions/ui.actions';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../modules/shared.module';
import { UNIT_TEST_INITIAL_SETTINGS, UNIT_TEST_INITIAL_UI } from '../../utils/constants';

describe('SideMenuComponent', (): void => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let store: Store<{ ui: UiController; settings: Settings }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            settings: UNIT_TEST_INITIAL_SETTINGS,
            ui: UNIT_TEST_INITIAL_UI,
          },
        })
      ]
    });

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  it('should close the side menu when closeSideMenu is called', (): void => {
    component.closeSideMenu();

    expect(store.dispatch).toHaveBeenCalledWith(
      toggleSideMenu({
        data: 'hidden',
      })
    );
  });

  it('should update sideMenuState when uiControllerObservable$ emits a value', (): void => {
    const ui: UiController = { sideMenu: { show: 'visible' }, loadingSpinner: { show: false } };
    component.uiControllerObservable$ = new Observable<UiController>((observer): void => {
      observer.next(ui);
    });
    component.subscribeToUiController();

    expect(component.sideMenuState).toEqual('visible');
  });

  it('should update settings when settingsObservable$ emits a value', (): void => {
    const settings: Settings = { theme: Theme.DARK, language: Language.ENGLISH };
    component.settingsObservable$ = new Observable<Settings>((observer) => {
      observer.next(settings);
    });
    component.subscribeToSettings();

    expect(component.settings).toEqual(settings);
  });

  it('should handle escape key press and call closeSideMenu', (): void => {
    const spy = spyOn(component, 'closeSideMenu');
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
    });

    document.dispatchEvent(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should set isDarkMode to true when theme is DARK', (): void => {
    component.settings = {...UNIT_TEST_INITIAL_SETTINGS, theme: Theme.DARK } ;

    expect(component.isDarkMode).toBeTruthy();
  });

  it('should set isDarkMode to false when theme is not DARK', (): void => {
    component.settings = {...UNIT_TEST_INITIAL_SETTINGS, theme: Theme.LIGHT } ;

    expect(component.isDarkMode).toBeFalsy();
  });
});
