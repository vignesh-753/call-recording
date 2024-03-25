import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  providers: [AndroidPermissions],
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private androidPermissions: AndroidPermissions
  ) { }

  async ngOnInit(): Promise<void> {
    await this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.READ_PHONE_STATE,
      this.androidPermissions.PERMISSION.READ_CALL_LOG,
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.CAPTURE_AUDIO_OUTPUT,
    ]);
  }
}
