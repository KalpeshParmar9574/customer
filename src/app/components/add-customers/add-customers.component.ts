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
  countryData: any
  regionData:any
  constructor(
    private customer: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  
  ngOnInit(){
  this._getCountryData() // get the country data from open api
  this._initForm() // init the addCustomerForm
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

_getCountryData() {
  this.customer._get_country_data().subscribe(
    (res: any) => {
      const rdata = Object.entries(res);
      const uniqueRegions = new Set();
      const regionData: any[] = [];
      //for region data
      rdata.forEach(([countryCode, {  region }]: any) => {
        if (!uniqueRegions.has(region)) {
          uniqueRegions.add(region);
          regionData.push( region );
        }
      });
      this.regionData = regionData;
      console.log(this.regionData);
// for countries data
      const cdata = Object.entries(res)    
      this.countryData  = cdata.map((key:any)=>{ 
        return  key[1].country
});
    },
    (err: any) => {
      console.log(err);
    }
  );
}
// add customer this method takes the inputs and send data to api
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


