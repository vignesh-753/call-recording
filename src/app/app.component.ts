import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private androidPermissions: AndroidPermissions) { }
  ngOnInit(): void {
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
    //   result => console.log('Has permission?', result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_PHONE_STATE, this.androidPermissions.PERMISSION.READ_CALL_LOG]);
  }
}
