import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.interface';
import { addProduct, addQty, sustractQty } from '../../state/actions/product.actions';
import { AppState } from '../../state/app.state';
import { selectProductList } from '../../state/selectors/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$ = new Observable<IProduct[]>();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductList);
  }

  addQty(product: IProduct) {
    this.store.dispatch(addQty({ product }));
  }

  sustractQty(product: IProduct) {
    this.store.dispatch(sustractQty({ product }));
  }

  addProduct(product: IProduct) {
    this.store.dispatch(addProduct({ product }));
  }

}
