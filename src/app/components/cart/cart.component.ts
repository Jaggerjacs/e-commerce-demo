import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.interface';
import { removeProduct } from '../../state/actions/product.actions';
import { selectCartProductList, selectTotalAmount } from '../../state/selectors/products.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts$ = new Observable<any>();
  totalAmount$ = new Observable<any>();

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProductList);
    this.totalAmount$ = this.store.select(selectTotalAmount);
  }

  remove(product: IProduct) {
    this.store.dispatch(removeProduct({ product }));
  }


}
