import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.css']
})
export class AddPinsComponent {
  userData!:any
constructor(private customer:CustomerService){}
ngOnInit(){
  this._getUserData()
}
_getUserData(){
  debugger
  this.customer.getCustomer().subscribe((res:any)=>{
    console.log(res);
    
     let tempData= Object.entries(res)
    this.userData= tempData.map((user:any)=>{return user[1].title})
     console.log(this.userData);
     
     
    
  })
}
}
