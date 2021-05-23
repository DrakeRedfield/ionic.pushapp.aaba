import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  messages: OSNotificationPayload[] = [];

  constructor(
    public pushService: PushService,
    private applicationRef: ApplicationRef,
  ) {}

  ngOnInit(){
    this.pushService.pushListener.subscribe( notification =>{
      this.messages.unshift(notification);
      this.applicationRef.tick();
    });
  }

  async ionViewWillEnter(){
    this.messages = await this.pushService.loadMessages();
  }

  clearNotifications(){
    this.pushService.clearNotifications();
    this.messages = [];
  }

}
