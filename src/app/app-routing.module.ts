import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './Pages/addcategory/addcategory.component';
import { ProductComponent } from './Pages/product/product.component';
import { OrderComponent } from './Pages/order/order.component';
import { DasboardComponent } from './dasboard/dasboard.component';


const routes: Routes = [
  {
    path:'addcatagory',
    component:AddcategoryComponent
  },
  {
    path:'product',
    component:ProductComponent
  },{
    path:'order',
    component:OrderComponent
  },{
    path:'dasboard',
    component:DasboardComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
