import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PinsDataService } from 'src/app/services/pins-data.service';
import { Route, Router } from '@angular/router';
import {  FileItem, FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.css']
})
export class AddPinsComponent {
  userData!: any
  pinDataForm!: FormGroup
  isDragOver: boolean = false
  selectedImageName: string = '';

  uploader: FileUploader;

  constructor(
    private customer: CustomerService,
    private fb: FormBuilder,
    private pins: PinsDataService,
    private route : Router
  ) {
    this.uploader = new FileUploader({
      url: 'http://localhost:3000/pins', //  JSON Server endpoint
      itemAlias: 'image',
      autoUpload: false // Disable auto-upload
    });
   }
ngOnInit(){
  this._getUserData()
  this._initForm()
}
_getUserData(){
  this.customer.getCustomer().subscribe((res:any)=>{
    console.log(res); 
     let tempData= Object.entries(res)
    this.userData= tempData.map((user:any)=>{return user[1].title})
     console.log(this.userData);
  })
}
  
  _initForm() {
 
    this.pinDataForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      image:new FormControl('', [Validators.required]),
      colobrators: new FormControl('', [Validators.required]),
      privacy : new FormControl('',[Validators.required])
  })
  }

 
  
  // _addPins() {
  //  debugger
  //   const data = this.pinDataForm.getRawValue();
  //   const body = {
  //     title: data.title,
  //     image: data.image,
  //     colobrators: data.colobrators,
  //     privacy:data.privacy
  //   }
  //   console.log(body);
    
  //   this.pins._addPins(body).subscribe((res) => {
  //     if (res) {
  //       alert("pin added successfully")
  //       this.route.navigate(['/home'])
  //     }
  //   }, (err) => {
  //     alert("something went worng please try again later ")
      
  //   })
    
  // }
// new code 
  
  _addPins() {
 
  if (this.pinDataForm.invalid) {
    return;
  }
  const data = this.pinDataForm.getRawValue();
  this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
    fileItem.withCredentials = false; // To avoid cross-origin resource sharing (CORS) issues
    this.uploader.options.additionalParameter = {
      title: data.title,
      colobrators: data.colobrators,
      privacy: data.privacy
    };
  };
  this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: any) => {
    // File upload success callback
    alert('Pin added successfully');
    this.route.navigate(['/home']);
  };
  this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
    // File upload error callback
    alert('Something went wrong. Please try again later.');
  };
  this.uploader.uploadAll();
}
  
// drag and drop functionlities
  allowDrop(event: any) {
    event.preventDefault();
    this.isDragOver = true;
  }

  handleDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.pinDataForm.patchValue({ image: files[0] });
      this.selectedImageName = files[0].name; 
    }
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.pinDataForm.patchValue({ image: files[0] });
    }
  }
 
}
