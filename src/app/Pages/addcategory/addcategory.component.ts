import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements OnInit {

  imagePath: SafeUrl | undefined;
  constructor(private http :HttpClient,private sanitizer: DomSanitizer){}

//Update Categoryy
  updateCategoryForm = new FormGroup({
    categoryID:new FormControl('',Validators.required),
    categoryname:new FormControl('',Validators.required),
    categorytype:new FormControl('',Validators.required)

  });
  selectedCategory: any;
  openUpdateModal(categoryID: number) {
    // Make an HTTP request to fetch category details by ID
    this.http.get(`http://localhost:8080/categories/${categoryID}`)
      .subscribe(
        (category: any) => {
          
          this.updateCategoryForm.patchValue({
            categoryID: category.categoryID,
            categoryname: category.categoryname,
            categorytype: category.categorytype,
           
          });
          this.selectedCategory = category;
        },
        (error) => {
          console.error('Error fetching category details', error);
          
        }
        
      );
  }
  onUpdateCategorySubmit() {
  if (this.updateCategoryForm.valid && this.selectedImage) {
    const formData = new FormData();
    const productdata = {...this.updateCategoryForm.value};
    delete productdata.categoryID;
    formData.append('data', JSON.stringify(productdata));
    formData.append('image', this.selectedImage);
    const categoryId = this.updateCategoryForm.controls.categoryID.value;

    this.http.post(`http://localhost:8080/categories/update/${categoryId}`, formData)
    .subscribe(
      (data: any) => {
        alert('Category Updated Successfully:   Id : ' + this.updateCategoryForm.get('categoryID')!.value);
       
        this.closemodal('update');
        window.location.reload();
      },
      (error) => {
        console.error('Error Updating category', error);
        alert('Error Updating category. Please try again.');
      }
    );
      

  }
}
  
  




  
  ngOnInit(): void {
      this.getcategory();
      
  } 
  sanitizeImage(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080' + imageUrl);
  }
  
  
  selectedImage: File | null = null;
  onImageChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedImage = fileInput.files[0];
    }
  }
//Add Category Api

addcategoryvalid= new FormGroup({
  categoryID:new FormControl('',Validators.required),
  categoryname:new FormControl('',Validators.required),
  categorytype:new FormControl('',Validators.required)

})
onAddCategorySubmit() {
  if (this.addcategoryvalid.valid && this.selectedImage) {
    const formData = new FormData();
     formData.append('data', JSON.stringify(this.addcategoryvalid.value));
      formData.append('image', this.selectedImage!);

      this.http.post('http://localhost:8080/categories/addCategory', formData)
      .subscribe(
        (data: any) => {
          alert('Category Added Successfully: ' + this.addcategoryvalid.get('categoryname')!.value);
          this.addcategoryvalid.reset();
          this.closemodal('myModal');
          window.location.reload();
        },
        (error) => {
          console.error('Error adding category', error);
          alert('Error adding category. Please try again.');
        }
      );
  } else {
    alert('Please enter data properly and select an image.');
  }
}

searchKeyword: string = '';
searchCategory() {
  if (this.searchKeyword.trim() !== '') {
    this.http.get(`http://localhost:8080/categories/search/${this.searchKeyword}`).subscribe((data: any) => {
      this.category = data;
      if (this.category.length === 0) {
        alert('No categories found for the given keyword.');
      }
    });
  } else {
    this.getcategory(); // Load all categories if no search keyword is provided
  }
}

//Get Category Api
  getcategory(){
    this.http.get('http://localhost:8080/categories/').subscribe((data :any)=>{
        for(let i =0;i<data.length;i++){
          data.imagename = this.getImagePathFromApi(data.imagename);
        }
        this.category = data;
    });
  }
  
category :any[]=[];

deleteCategory(categoryId: number) {
  if(confirm("Are you Sure?")){
   this.http.delete(`http://localhost:8080/categories/${categoryId}`).subscribe(() => {
   
    this.category = this.category.filter(category => category.categoryID !== categoryId);
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

getImagePathFromApi(path : any) {
  // Assuming imagePathFromApi is the image path you received from your API
  const imagePathFromApi = path;

  // Sanitize the image path
 return this.sanitizer.bypassSecurityTrustUrl("file:\\\\\\" + imagePathFromApi);
}

closemodal(modalid:string){
  const modaldiv = document.getElementById(modalid);
  if(modaldiv != null)
  {
    modaldiv.style.display = 'none';
  }
}
}
function data(value: Object): void {
  throw new Error('Function not implemented.');
}

