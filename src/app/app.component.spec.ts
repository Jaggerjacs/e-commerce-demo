import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ProductActions } from './state/actions/product.actions';
import { AppState } from './state/app.state';
import { selectLoading } from './state/selectors/products.selectors';

let mockStore: MockStore<AppState>;
let mockSelector: MemoizedSelector<AppState, boolean>;

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [provideMockStore()]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelector = mockStore.overrideSelector(selectLoading, false);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a false value by dfefault on loading', () => {
    component.loading$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should have a true value on loading selector', () => {
    mockSelector.setResult(true);
    mockStore.refreshState();
    component.loading$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should render a Loading text on true value', () => {
    mockSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(compiled.querySelector('.loading')?.textContent).toContain('Loading');
  });

  it('should dispatch LOAD_PRODUCTS action on init', () => {
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe(ProductActions.LOAD_PRODUCTS);
    });
  });

  it('should have a showCart false value on init', () => {
    expect(component.showCart).toBe(false);
  });

  it('should change showCart value to true on toglleCart', () => {
    component.toggleCart();
    expect(component.showCart).toBe(true);
  });



});
