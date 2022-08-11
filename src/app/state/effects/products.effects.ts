import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Injectable()
export class ProductsEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType('[Product List] Load products'),
        mergeMap(() => this.apiService.getAllProducts()
            .pipe(
                map(products => {
                    products.forEach((el) => {
                        el.qty = 1;
                    });
                    return ({ type: '[Product List] Loaded success', products })
                }),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }
}