import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {


  productvalid = new FormGroup({
    productname:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    category:new FormControl('',Validators.required)
  })
 

  selectedImage: File | null = null;
  onImageChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedImage = fileInput.files[0];
    }
  }
  onAddProductSubmit() {
    if (this.productvalid.valid && this.selectedImage) {
      const formData = new FormData();
      const productdata = {...this.productvalid.value};
      delete productdata.category;
      formData.append('data', JSON.stringify(productdata));
      formData.append('image', this.selectedImage);
      const categoryId = this.productvalid.controls.category.value;

      this.http.post(`http://localhost:8080/product/category/${categoryId}/product`, formData)
      .subscribe(
        (data: any) => {
          alert('Product Added Successfully : '+this.productvalid.get('productname')!.value);
          this.productvalid.reset();
          this.closemodal('addproduct');
          window.location.reload();
        },
        (error) => {
          console.error('Error adding product', error);
          alert('Error adding product. Please try again.');
        }
      );
  } else {
    alert('Please enter data properly and select an image.');
    }
  }


  ngOnInit(): void {
      this.getproductdata();
  }
  searchKeyword: string = '';
  searchCategory() {
    if (this.searchKeyword.trim() !== '') {
      this.http.get(`http://localhost:8080/product/search/${this.searchKeyword}`).subscribe((data: any) => {
        this.products = data;
        if (this.products.length === 0) {
          alert('No categories found for the given keyword.');
        }
      });
    } else {
      this.getproductdata(); // Load all categories if no search keyword is provided
    }
  }
  


products :any[] = [];
getproductdata(){
  this.http.get('http://localhost:8080/product/').subscribe((data:any)=>{ 
    this.products=data;

  })
}
deleteproduct(productId: number) {
  if(confirm("Are you Sure?")){
     this.http.delete(`http://localhost:8080/product/delete/${productId}`).subscribe(() => {
   
    this.products = this.products.filter(products => products.productId !== productId);
  });
  }
  

}
openmodal(modalid:string){
  const modaldiv = document.getElementById(modalid);
  if(modaldiv != null)
  {
    modaldiv.style.display = 'block';
  }
}

closemodal(modalid:string){
  const modaldiv = document.getElementById(modalid);
  if(modaldiv != null)
  {
    modaldiv.style.display = 'none';
  }
}

constructor(private http :HttpClient){}
// UPDATE CATEGORY
updateProductForm = new FormGroup({
  productId:new FormControl('',Validators.required),
  productname:new FormControl('',Validators.required),
  quantity:new FormControl('',Validators.required),
  price:new FormControl('',Validators.required),
  description:new FormControl('',Validators.required),
  category:new FormControl('',Validators.required)

});

selectedCategory: any;
  openUpdateModal(productId: number) {
    // Make an HTTP request to fetch Product details by ID
    this.http.get(`http://localhost:8080/product/allproducts/${productId}`)
      .subscribe(
        (product: any) => {
          
          this.updateProductForm.patchValue({
            productId:product.productId,
            productname: product.productname,
            quantity: product.quantity,
            price: product.price,
            description: product.description,
            category: product.category?.categoryID
           
          });
          this.selectedCategory = product;
        },
        (error) => {
          console.error('Error fetching category details', error);
          
        }
       
        
      );
      console.log(this.products);
  }
onUpdateProductSubmit() {
  if (this.updateProductForm.valid && this.selectedImage) {
    const formData = new FormData();
  
    const productdata = {...this.updateProductForm.value};
    delete productdata.productId;
    delete productdata.category;
    formData.append('data', JSON.stringify(productdata));
    formData.append('image', this.selectedImage);

    const productId = this.updateProductForm.controls.productId.value;

    this.http.post(`http://localhost:8080/product/update/${productId}`, formData)
    .subscribe(
      (data: any) => {
        alert('Product Updated Successfully:   Id : ' + this.updateProductForm.get('productId')!.value);
       
        this.closemodal('update');
        window.location.reload();
      },
      (error) => {
        console.error('Error Updating category', error);
        alert('Error Updating Product. Please try again.');
      }
    );
  }
}
}


