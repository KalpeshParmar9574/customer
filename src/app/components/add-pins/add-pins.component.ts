import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PinsDataService } from 'src/app/services/pins-data.service';
import { Route, Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/pins';
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

  uploader!: FileUploader;
  hasBaseDropZoneOver!:boolean;
  hasAnotherDropZoneOver!:boolean;
  response!: string;
  storeIMG!: any;

  constructor(
    private customer: CustomerService,
    private fb: FormBuilder,
    private pins: PinsDataService,
    private route : Router
  ) {
    // this.uploader = new FileUploader({
    //   url: 'http://localhost:3000/pins', //  JSON Server endpoint
    //   itemAlias: 'image',
    //   autoUpload: false // Disable auto-upload
    // });

    
    this.uploader = new FileUploader({
       url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item:any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
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

 
  
  _addPins() {
   debugger
    const data = this.pinDataForm.getRawValue();
    const body = {
      title: data.title,
      colobrators: data.colobrators,
      privacy:data.privacy
    }
    console.log(body);
    
    this.pins._addPins(body).subscribe((res) => {
      if (res) {
        alert("pin added successfully")
        console.log(res);
        this.storeImgData(res,data.image)
        this.route.navigate(['home'])
      }
    }, (err) => {
      alert("something went worng please try again later ")
      
    })
    
    // 
   
  }
  storeImgData(res: any, image: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = {
        img: event.target?.result,
        id: res.id
      };
      console.log(imgData);
      
      const storedImgData = localStorage.getItem('imageData');
      if (storedImgData) { 
        const tempData = JSON.parse(storedImgData);
        tempData.push(imgData);
        localStorage.setItem('imageData', JSON.stringify(tempData));
      } else {
        localStorage.setItem('imageData', JSON.stringify([imgData]));
      }
    };
    
    reader.readAsDataURL(image);
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
