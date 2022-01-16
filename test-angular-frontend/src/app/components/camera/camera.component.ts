import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  public video: HTMLVideoElement;
  public constraints = { audio: false, video: true };

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.listeningToMakeCall();
    this.listeningEndCall();
  }

  initCall() {
    !this.video ? this.socketService.initCall() : false;
  }

  listeningToMakeCall() {
    this.socketService.listenInitCall().subscribe((data: any) => {
      this.video = document.querySelector('video');
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        this.video.srcObject = stream;
        Swal.fire({
          position: "center",
          icon: "success",
          title: '¡Éxito! la cámara iniciara en breve',
          backdrop: false,
          showConfirmButton: false,
          timer: 1500,
        });
      }, error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error,
          backdrop: false,
        });
        console.log('Error: ' + error);
      });
    });
  }

  endCall() {
    this.video ? this.socketService.endCall() : false;
  }

  listeningEndCall() {
    this.socketService.listenEndCall().subscribe((data: any) => {
      this.video = document.querySelector('video');
      this.video.srcObject = null;
      this.video = null;
      Swal.fire({
        position: "center",
        icon: "success",
        title: 'Video finalizado',
        backdrop: false,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
