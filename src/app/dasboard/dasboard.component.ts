import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
export interface Product {
  productId: number;
  productname: string;
  quantity: number;
  image: string;
  price: number;
  category: {
    categoryID: number;
    categoryname: string;
    categorytype: string;
    imagename: string;
  };
  description: string;
}
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css'
})
export class DasboardComponent implements OnInit {
  constructor(private http:HttpClient){}
  ngOnInit() {
   this.totalsales();
   this.totalorder();
   this.totalResponse();
   this.totalproduct();
   this.totaluser();
   this.mostproduct();
  }
  totalamount:any
  totalsales(){
    this.http.get('http://localhost:8080/report/total-amount').subscribe((data:any)=>{
    this.totalamount=data;
   
    });
  }
  totalorderCount:any
  totalorder(){
    this.http.get('http://localhost:8080/report/total-Count').subscribe((data:any)=>{
    this.totalorderCount=data;
    
    });
  }
  response:any
  totalResponse(){
    this.http.get('http://localhost:8080/report/total-response').subscribe((data:any)=>{
    this.response=data;
    
    });
  }
  totalproductcount:any
  totalproduct(){
    this.http.get('http://localhost:8080/report/total-products').subscribe((data:any)=>{
    this.totalproductcount=data;
    });
  }
  totalusercount:any
  totaluser(){
    this.http.get('http://localhost:8080/report/total-user').subscribe((data:any)=>{
    this.totalusercount=data;
    });
  }
  productdata: Product | undefined;
mostproduct(){
  this.http.get('http://localhost:8080/report/most-sold').subscribe((data:any)=>{
    this.productdata = data;
    console.log(this.productdata)
    });
}
  
}
