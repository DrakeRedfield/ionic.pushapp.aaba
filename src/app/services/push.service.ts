import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  notifications: OSNotificationPayload[] = [];
  pushListener = new EventEmitter<OSNotificationPayload>();
  userId: string = '';

  constructor(
    private oneSignal: OneSignal,
    private localData: Storage,
  ) {
    this.loadMessages();
  }

  initConfiguration(){
    this.oneSignal.startInit('AppIdOneSignal', 'FirebaseProjectNumber');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((response) => {
      // do something when notification is received
      console.log('Response recibed', response);
      this.addNewNotification( response );
    });

    this.oneSignal.handleNotificationOpened().subscribe( async (response) => {
      // do something when a notification is opened
      console.log('response Open', response)
      await this.addNewNotification( response.notification );
    });

    this.oneSignal.getIds().then( info =>{
      this.userId = info.userId;
    });

    this.oneSignal.endInit();
  }

  async loadMessages(){
    this.notifications = await this.localData.get('notifications') || []
    return this.notifications;
  }

  async addNewNotification( notification: OSNotification ){
    await this.loadMessages();
    const payload = notification.payload;
    if( this.notifications.find( el => payload.notificationID === el.notificationID ) ) return;
    this.notifications.unshift( payload );
    this.pushListener.emit(payload)
    await this.saveInLocalData();
  }

  saveInLocalData(){
    this.localData.set('notifications',this.notifications);
  }

  async clearNotifications(){
    this.notifications = [];
    await this.localData.set('notifications', this.notifications);
  }
}
