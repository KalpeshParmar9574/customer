import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pins-data',
  templateUrl: './pins-data.component.html',
  styleUrls: ['./pins-data.component.css']
})
export class PinsDataComponent {
constructor(private router:Router){}

_goto_addCutomer(){
this.router.navigate(['/addCustomer'])
}

goto_addPins(){
  this.router.navigate(['/addPins'])
  }
}
