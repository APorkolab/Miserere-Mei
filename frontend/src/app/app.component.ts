import { Component } from '@angular/core';
import { ConfigService, IMenuItem } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  constructor(private config: ConfigService) {
    let win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      }
      // Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
  }
  title = 'MiserereMei';
  sidebar: IMenuItem[] = this.config.sidebarMenu;
}

