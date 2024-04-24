import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  confirmationDate: string;
  modeOfPayment: string;
  address: string;
  confirmationItems: ConfirmationItem[];
  username: string;
}

interface ConfirmationItem {
  id: number;
  orderConfirmationId: number;
  productId: number;
  quantity: number;
  productImage: string;
  productname: string;
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  constructor(private http:HttpClient){}
  ngOnInit() {
    this.http.get<Order[]>('http://localhost:8080/Confirm/all').subscribe(data => {
      this.orderdata = data;
      console.log(this.orderdata);
    });
  }
  showTable: boolean = true;
  selectedOrder: Order | null = null;
  orderdata: Order[] = [];

  showDetails(order: Order): void {
    this.selectedOrder = order;
    this.showTable = false;
  }

  showTableSection(): void {
    this.showTable = true;
    this.selectedOrder = null;
  }

}
