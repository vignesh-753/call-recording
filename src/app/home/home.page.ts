import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

declare var PhoneCallTrap: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [Media, CallNumber],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule,],
})
export class HomePage implements OnInit {
  file!: MediaObject;
  status: any = null

  @ViewChild('phoneNumber') phoneNumber!: ElementRef

  constructor(
    private media: Media,
    private call: CallNumber,

  ) { }

  ngOnInit() {
    this.phonecalls()
  }

  initCallRecorder() {
    this.file = this.media.create('/')
    this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe((error: any) => {
      console.log('Error!', error)
    });
  }

  phonecalls() {
    const that = this;
    PhoneCallTrap.onCall(function (state: string) {

      switch (state) {
        case "RINGING":
          console.log("Phone is ringing");
          break;
        case "OFFHOOK":
          alert(state);
          that.stopRecording()
          console.log("Phone is off-hook");
          break;
        case "IDLE":
          console.log("Phone is idle");
          break;
      }
    })
  }

  async callNumber() {
    try {
      this.stopRecording()
      await this.call.callNumber(this.phoneNumber.nativeElement.value, true)
      this.startRecording()
    } catch (error) {
      console.log(error)
    }
  }

  startRecording() {
    this.file.startRecord();
  }

  stopRecording() {
    this.file.stopRecord();
  }
}​​​​​