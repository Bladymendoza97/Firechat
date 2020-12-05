import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FireChat';


  public chats: Observable<any[]>;


  constructor(
   public firestore: AngularFirestore,
   public chatService: ChatService
     ) {
    // this.chats = firestore.collection('chats').valueChanges();
  }
}
