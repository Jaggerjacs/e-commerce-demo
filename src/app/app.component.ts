import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from './state/actions/product.actions';
import { AppState } from './state/app.state';
import { selectLoading } from './state/selectors/products.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$ = new Observable<boolean>();
  showCart = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.loading$ = this.store.select(selectLoading);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
