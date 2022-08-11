import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: any[] = [];
  totalAmount = 0;

  constructor() { }

  ngOnInit(): void {
    // this.cartProducts = [
    //   {
    //     id: 1,
    //     title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    //     price: 109.95,
    //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    //     qty: 1
    //   },
    // ];
  }

  remove(index: number) {
  }


}
