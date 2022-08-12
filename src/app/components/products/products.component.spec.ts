import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IProduct } from '../../models/product.interface';
import { ProductActions } from '../../state/actions/product.actions';
import { AppState } from '../../state/app.state';
import { selectProductList } from '../../state/selectors/products.selectors';

import { ProductsComponent } from './products.component';

let mockStore: MockStore<AppState>;
let mockSelector: MemoizedSelector<AppState, IProduct[]>;

let product: IProduct = {
  id: 0,
  title: 'test',
  amount: 100,
  image: 'noImg',
  price: 10,
  qty: 10
};

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelector = mockStore.overrideSelector(selectProductList, []);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create products component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty array of products on init', () => {
    component.products$.subscribe((values) => {
      expect(values.length).toBe(0);
    });
  });

  it('should receive an array of products when subscribe to selector', () => {
    mockSelector.setResult([product]);
    mockStore.refreshState();
    component.products$.subscribe((values) => {
      expect(values.length).toBe(1);
    });
  });

  it('should dispatch ADD_QTY action on addProductQty call', () => {
    component.addProductQty(product);
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe(ProductActions.ADD_QTY);
    });
  });

  it('should dispatch SUBTRACT_QTY action on subtractProductQty call', () => {
    component.subtractProductQty(product);
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe(ProductActions.SUBTRACT_QTY);
    });
  });

  it('should dispatch ADD_PRODUCT action on addProduct call', () => {
    component.addProduct(product);
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe(ProductActions.ADD_PRODUCT);
    });
  });

  it('should not render products on init', () => {
    expect(compiled.querySelector('.product__title')).toBeFalsy();
  });

  it('should render products on products selector subscribe', () => {
    mockSelector.setResult([product]);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(compiled.querySelector('.product__title')?.textContent).toContain(product.title);
  });

  it('should call methods on click (addProduct)', () => {
    const spy = spyOn(component, 'addProduct');
    mockSelector.setResult([product]);
    mockStore.refreshState();
    fixture.detectChanges();
    const button = compiled.querySelector('.product__btn--add') as HTMLButtonElement;
    button.click();
    expect(spy).toHaveBeenCalled();
  });

});
