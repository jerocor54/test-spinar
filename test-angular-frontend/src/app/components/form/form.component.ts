import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public product: Product = new Product;
  public validating: boolean = false;
  public textBtn: string = 'Agregar';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form: any){
    this.validating = true;
    if(form.invalid) return false;
    this.socketService.sendProduct(this.product);
    this.product = new Product();
    form.reset(this.product);
    this.validating = false;
    this.textBtn = '¡El producto se agrego con éxito!';
    setTimeout(() => {
      this.textBtn = 'Agregar';
    }, 1500);
  }

}
