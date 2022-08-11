import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.interface';
import { ApiService } from '../../services/api.service';
import { AppState } from '../../state/app.state';
import { selectLoading, selectProductList } from '../../state/selectors/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$ = new Observable<any>();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductList);
  }

  addProduct(index: number) {
  }

}
