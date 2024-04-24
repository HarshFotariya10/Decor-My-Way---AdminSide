import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule ,FormGroup} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { AddcategoryComponent } from './Pages/addcategory/addcategory.component';
import {  HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './Pages/product/product.component';
import { SafeUrlPipe } from './SafeUrlPipes.component';
import { OrderComponent } from './Pages/order/order.component';
import { OrderSuccessComponent } from './Pages/order-success/order-success.component';
import { DasboardComponent } from './dasboard/dasboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddcategoryComponent,
    ProductComponent,
    SafeUrlPipe,
    OrderComponent,
    OrderSuccessComponent,
    DasboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgFor,
    HttpClientModule
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
