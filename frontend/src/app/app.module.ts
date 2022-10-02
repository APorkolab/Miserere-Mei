import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './page/nav/nav.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { PrefaceComponent } from './page/preface/preface.component';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';
import { UsersEditorComponent } from './page/users-editor/users-editor.component';
import { PlacesEditorComponent } from './page/places-editor/places-editor.component';
import { PlacesComponent } from './page/places/places.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ForbiddenComponent,
    PrefaceComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    UsersEditorComponent,
    PlacesEditorComponent,
    PlacesComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
