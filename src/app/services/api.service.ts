import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products');
  }
}
