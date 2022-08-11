import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllProducts()
      .subscribe((res) => {
        console.log(res);
        this.products = res;
      }
      );
  }

  addProduct(index: number) {
    console.log(this.products[index]);
  }

}
