import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})

export class AddCustomersComponent {
  addCustomerForm!:any
  countryData:any
  constructor(private customer:CustomerService,private fb:FormBuilder,private router:Router){

  }


  ngOnInit(){
this._getCountryData()
this._initForm()
  }
_initForm(){

  this.addCustomerForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    country: new FormControl ('',[Validators.required]),
    region: new FormControl('',[Validators.required])
  }
  )
}

_getCountryData(){
  this.customer._get_country_data().subscribe((res:any)=>{
    const data = Object.entries(res)    
    let tempData= data.map((key:any)=>{ 
      let temp:any={}
      temp={"country": key[1].country, "region":key[1].region}
      return temp
      });
      this.countryData= tempData.filter((item)=>{
      
      })
  }),(err:any)=>{ 
console.log(err);

  }
}

addCustomer(){
const data =this.addCustomerForm.getRawValue()
console.log(data);
this.customer._addCustomer(data).subscribe((res)=>{
  if(res){
    alert("customer added")
    this.router.navigate(['/addPins'])
  }
},(err)=>{
  alert("something went wrong please try again later ")
})
}
}


