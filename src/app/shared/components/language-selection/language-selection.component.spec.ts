import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectionComponent } from './language-selection.component';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language, Settings } from '../../types/Settings';
import { updateLanguage } from '../../../store/actions/settings.actions';
import { of } from 'rxjs';
import { SharedModule } from '../../modules/shared.module';
import { UiController } from '../../types/UiController';

describe('LanguageSelectionComponent', (): void => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;
  let store: Store<{ settings: Settings; ui: UiController }>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSelectionComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
      providers: [TranslateService],
    });

    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    translateService = TestBed.inject(TranslateService);

    spyOn(store, 'select').and.returnValue(of({ language: 'en' }));
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedLanguage from store', (): void => {
    fixture.detectChanges();
    expect(component.selectedLanguage).toEqual('en');
  });

  it('should dispatch updateLanguage when onLanguageChange is called', (): void => {
    spyOn(store, 'dispatch');
    spyOn(translateService, 'use');
    const event: any = { target: { value: 'es' } };
    component.selectedLanguage = Language.SPANISH;

    component.onLanguageChange(event);
    fixture.detectChanges();

    expect(translateService.use).toHaveBeenCalledWith('es');
    expect(store.dispatch).toHaveBeenCalledWith(updateLanguage({ data: Language.SPANISH }));

  });


  it('should unsubscribe from observables on ngOnDestroy', (): void => {
    spyOn(component['_destroy$'], 'next');
    spyOn(component['_destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['_destroy$'].next).toHaveBeenCalled();
    expect(component['_destroy$'].complete).toHaveBeenCalled();
  });
});
