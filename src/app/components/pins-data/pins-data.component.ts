import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PinsDataService } from 'src/app/services/pins-data.service';

@Component({
  selector: 'app-pins-data',
  templateUrl: './pins-data.component.html',
  styleUrls: ['./pins-data.component.css']
})
export class PinsDataComponent {

  pinsData:any
  constructor(
    private router: Router,
    private pins:PinsDataService
  ) { }

  ngOnInit() {
    this._getPinsData() // get the pins data
  }
_goto_addCutomer(){
this.router.navigate(['/addCustomer'])
}

_goto_addPins(){
  this.router.navigate(['/addPins'])
}
  
  _getPinsData() {
    this.pins._getPinsData().subscribe((res) => {
      this.pinsData = res
    },(err:any)=>{alert("error in fetching data please chekc network")})
  }
}
