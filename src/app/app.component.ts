import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';
import { loadProducts } from './state/actions/product.actions';
import { selectLoading } from './state/selectors/products.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$ = new Observable<boolean>();
  showCart = false;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.loading$ = this.store.select(selectLoading).pipe(shareReplay());
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
