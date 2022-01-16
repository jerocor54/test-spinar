import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from '@angular/material/button';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { CameraComponent } from './components/camera/camera.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
