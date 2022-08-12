import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { ProductActions } from '../actions/product.actions';

@Injectable()
export class ProductsEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.LOAD_PRODUCTS),
        mergeMap(() => this.apiService.getAllProducts()
            .pipe(
                map(products => {
                    products.forEach((el) => {
                        el.qty = 1;
                    });
                    return ({ type: ProductActions.LOADED_PRODUCTS, products })
                }),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }
}