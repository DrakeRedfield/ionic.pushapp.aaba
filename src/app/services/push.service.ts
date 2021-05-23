import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private oneSignal: OneSignal,
  ) { }

  initConfiguration(){
    this.oneSignal.startInit('7ec76544-2b6a-491a-97ca-168f156ef60a', '466149435842');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((response) => {
      // do something when notification is received
      console.log('Response recibed', response);
    });

    this.oneSignal.handleNotificationOpened().subscribe((response) => {
      // do something when a notification is opened
      console.log('response Open', response)
    });

    this.oneSignal.endInit();
  }
}
