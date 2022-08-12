import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ICartProductState } from '../../models/cart-product.state';
import { IProduct } from '../../models/product.interface';
import { ProductActions } from '../../state/actions/product.actions';
import { AppState } from '../../state/app.state';
import { selectCartProductList, selectTotalAmount } from '../../state/selectors/products.selectors';

import { CartComponent } from './cart.component';

let mockStore: MockStore<ICartProductState>;
let mockSelectorProds: MemoizedSelector<ICartProductState, IProduct[]>;
let mockSelectorTotal: MemoizedSelector<ICartProductState, number>;

let product: IProduct = {
  id: 0,
  title: 'test',
  amount: 100,
  image: 'noImg',
  price: 10,
  qty: 10
};

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectorProds = mockStore.overrideSelector(selectCartProductList, []);
    mockSelectorTotal = mockStore.overrideSelector(selectTotalAmount, 0);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty array of products on init', () => {
    component.cartProducts$.subscribe((values) => {
      expect(values.length).toBe(0);
    });
  });

  it('should receive products when selector subscribe', () => {
    mockSelectorProds.setResult([product]);
    mockStore.refreshState();
    component.cartProducts$.subscribe((values) => {
      expect(values.length).toBe(1);
    });
  });

  it('should receive totalAmont when selector subscribe', () => {
    expect(compiled.querySelector('.total-amount .total-amount')?.textContent).toContain('0.00');
    mockSelectorTotal.setResult(100);
    mockStore.refreshState();
    component.totalAmount$.subscribe((value) => {
      expect(value).toBe(100);
    });
    fixture.detectChanges();
    expect(compiled.querySelector('.total-amount .total-amount')?.textContent).toContain('100.00');
  });

  it('should dispatch REMOVE_PRODUCT action on remove call', () => {
    component.remove(product);
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe(ProductActions.REMOVE_PRODUCT);
    });
  });

  it('should render empty msg when cart has no products added', () => {
    expect(compiled.querySelector('.empty-cart')?.textContent).toContain('No products on the cart');
    mockSelectorProds.setResult([product]);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(compiled.querySelector('.empty-cart')).toBeFalsy();
    expect(compiled.querySelector('.product__title')?.textContent).toBe(product.title);
  });

});
