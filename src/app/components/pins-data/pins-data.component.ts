import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PinsDataService } from 'src/app/services/pins-data.service';


@Component({
  selector: 'app-pins-data',
  templateUrl: './pins-data.component.html',
  styleUrls: ['./pins-data.component.css']
})
export class PinsDataComponent {
  pinsData: any
  constructor(
    private router: Router,
    private pins: PinsDataService,
   
  ) { 
  }

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
    
      this._getImgData(res)
    },(err:any)=>{alert("error in fetching data please chekc network")})
  }

  _getImgData(res:any) {
    const temp = localStorage.getItem('imageData');
    if (temp) {
      const imgs = JSON.parse(temp);
      this.pinsData = res.filter((item:any) => {
        return imgs.some((img:any) => {
          if (item.id === img.id) {
            item.img = img;
            return true;
          }
          return false;
        });
      });
      
    }
  }

}

//test code to implementing modal
  // open() {
  //   this.modalRef = this.modalService.open(this.modal);
  // }
  // close() {
  //   if (this.modalRef) {
  //     this.modalRef.close();
  //   }
  // }
  // @ViewChild('modal') modal!: any;
  // modalRef: NgbModalRef | undefined;