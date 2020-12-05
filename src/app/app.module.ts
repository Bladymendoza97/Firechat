import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';





@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
