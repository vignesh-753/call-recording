import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
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
    private androidPermissions: AndroidPermissions,
  ) { }

  ngOnInit() {

    this.checkPermissions()
    this.initPhoneCallStatus()
    this.initCallRecorder()
  }


  async checkPermissions() {
    try {
      const phoneStateResult = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
      if (!phoneStateResult.hasPermission) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
      }

      const callLogResult = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_CALL_LOG)
      if (!callLogResult.hasPermission) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CALL_LOG)
      }

      const storageResult = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      if (!storageResult.hasPermission) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      }

    } catch (error) {
      console.log('Error!', error)
    }
  }

  private initCallRecorder() {
    this.file = this.media.create('/')
    this.file.onStatusUpdate.subscribe((status: any) => console.log(status)); // fires when file status changes
    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe((error: any) => {
      console.log('Error!', error)
    });
  }

  private initPhoneCallStatus() {
    const that = this;
    PhoneCallTrap.onCall(function (state: string) {

      switch (state) {
        case "RINGING":
          console.log("Phone is ringing");
          break;
        case "OFFHOOK":
          that.startRecording()
          console.log("Phone is off-hook");
          break;
        case "IDLE":
          that.stopRecording()
          console.log("Phone is idle");
          break;
      }
    })
  }

  async callNumber() {
    try {
      // this.stopRecording()

      const that = this;
      setTimeout(async () => {

        // that.startRecording()
        await that.call.callNumber(that.phoneNumber.nativeElement.value, true)
      }, 100);

    } catch (error) {
      console.log(error)
    }
  }

  private startRecording() {
    this.file.startRecord();
  }

  private stopRecording() {
    this.file.stopRecord();
  }
}​​​​​