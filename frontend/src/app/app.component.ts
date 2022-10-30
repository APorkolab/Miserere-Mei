import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import Scrollbar from 'smooth-scrollbar';
import { ConfigService, IMenuItem } from './service/config.service';
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
<<<<<<< HEAD
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Miserere Mei v0.8';
}
=======
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  constructor(private config: ConfigService) {
  }

  ngAfterViewInit() {
    Scrollbar.init(document.querySelector('#scrollbar')!, {
      damping: 0.5,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true
    });
  }

  title = 'MiserereMei';
  sidebar: IMenuItem[] = this.config.sidebarMenu;
}

>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
