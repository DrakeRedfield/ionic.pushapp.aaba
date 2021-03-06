import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService,
    private storage: Storage,
  ) {
    this.storage.create();
    this.initializeApp()
  }

  initializeApp(){
    this.platform.ready().then( ()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushService.initConfiguration();
    });
  }
}
