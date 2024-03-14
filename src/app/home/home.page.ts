import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { CallNumber } from "@ionic-native/call-number/ngx"
import { CallDetector, PhoneState } from "capacitor-plugin-incoming-call";
import { CommonModule } from '@angular/common';
import { CallLog } from "@ionic-native/call-log/ngx";

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


  async ngOnInit(): Promise<void> {

    // CallDetector.detectCallState({ action: 'ACTIVATE' }).then(x => console.log(x)).catch(e => console.error(e));
    // CallDetector.addListener('callStateChange', res => {
    //   console.log('### Listening to callStateChange ###');
    //   console.log(res);
    //   this.status = res
    // });
    this.phonecalls()

    this.file = this.media.create('/')

    this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    const that = this;
    this.file.onError.subscribe((error: any) => {
      console.log('Error!', error)

      if (error.code === 1) {
        that.file.stop()
      }
    });
  }


  phonecalls() {
    const that = this;
    PhoneCallTrap.onCall(function (state: string) {
      alert(state);

      switch (state) {
        case "RINGING":
          console.log("Phone is ringing");
          break;
        case "OFFHOOK":
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
      await this.call.callNumber(this.phoneNumber.nativeElement.value, true)
      this.startRecording()
    } catch (error) {
      console.log(error)
    }
  }

  startRecording() {
    // this.stopRecording()    this.file.stop();

    this.file.startRecord();
  }

  stopRecording() {
    this.file.stopRecord();
  }

  play() {
    this.file.play()
  }
}​​​​​