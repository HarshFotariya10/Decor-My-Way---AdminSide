import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './Pages/addcategory/addcategory.component';
import { ProductComponent } from './Pages/product/product.component';


const routes: Routes = [
  {
    path:'addcatagory',
    component:AddcategoryComponent
  },
  {
    path:'product',
    component:ProductComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
