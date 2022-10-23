import { Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {

      Scrollbar.init(document.querySelector('#sidenav-scrollbar')!);
    }

  }

}
