import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PinsDataService } from 'src/app/services/pins-data.service';
import { Route, Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.css']
})
export class AddPinsComponent {
  userData!: any
  pinDataForm!:FormGroup
  constructor(
    private customer: CustomerService,
    private fb: FormBuilder,
    private pins: PinsDataService,
    private route : Router
  ) { }
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
     const URL = 'http://localhost:3000/'
    this.pinDataForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      image:new FormControl('', [Validators.required]),
      colobrators: new FormControl('', [Validators.required]),
      privacy : new FormControl('',[Validators.required])
  })
  }
  
  _addPins() {
   
    const data = this.pinDataForm.getRawValue();
    let filepath = data.image.substring(data.image.lastIndexOf("\\") + 1);
    const fileURL=`http://localhost:3000/`+ filepath
    const body = {
      title: data.title,
      image: new FileUploader({ url: fileURL }),
      colobrators: data.colobrators,
      privacy:data.privacy
    }
    this.pins._addPins(body).subscribe((res) => {
      if (res) {
        alert("pin added successfully")
        this.route.navigate(['/home'])
      }
    }, (err) => {
      alert("something went worng please try again later ")
      
    })
    
  }
}
