import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SocketService } from 'src/app/services/socket.service';
import { Product } from 'src/models/Product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource([]);
  public displayedColumns: string[] = ['name', 'price', 'amount', 'description', 'remove'];
  public products: Product[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.getProducts();
    this.listenNewProduct();
    this.listenIdProductToDelete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listenNewProduct(){
    this.socketService.getProduct().subscribe((product: any) => {
      this.products.push(product);
      localStorage.setItem('products', JSON.stringify(this.products));
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  getProducts(){
    this.products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    this.dataSource = new MatTableDataSource(this.products);
  }

  deleteProduct(row: number){
    const index = this.dataSource.data.indexOf(row, 0);
    this.products.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    localStorage.setItem('products', JSON.stringify(this.products));
    this.socketService.sendIdProductToDelete();
  }

  listenIdProductToDelete(){
    this.socketService.getIdProductToDelete().subscribe((idProduct: any) => {
      this.products = JSON.parse(localStorage.getItem('products'));
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }

}