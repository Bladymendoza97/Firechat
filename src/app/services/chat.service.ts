import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../Interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class ChatService {


  //Las colecciones nos permitiran traer registros en forma de un arreglo que



  // Lee una collecion en particular
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuarioLogin: any = {};

  chat: Mensaje;

  public newArrName: Mensaje[] = [];


  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
  ) {



    this.auth.authState.subscribe((user: any) => {
      console.log('Estado del usuario', user);
      if (user.uid) {

        console.log(user.photoURL);
      }
      else {
        if (!user.uid) {
          console.log(user.photoURL);
          
        }
      }


      this.usuarioLogin.nombre = user.displayName;
      this.usuarioLogin.uid = user.uid;

      



      console.log(this.usuarioLogin);

    });





  }


  // cargarMensajes() {

  //   this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref //haciendo Query a FIREBASE para configurar el orden y prioridad de los mensajes enviados
  //     .orderBy('fecha', 'desc') // ordenando la collecion que es traida desde 'direbase' por la fecha, de manera desendiente
  //     .limit(100)); // limitando el numero de colleciones de chats que nos traemos desde 'firebase'


  //   //Estamos pendientes de todos los cambios que ocurran en el documento 'Chats' o nodo de 'Chats'
  //   return this.itemsCollection.snapshotChanges()// 'valueChanges()' con este metodo estamos pendiente de todo lo que suceda en el documento de 'chats' que es traido desde firebase

  //     .pipe(
  //       // El 'map' trabaja con la respuesta de un 'observable' la transforma y vuelve a regresar algo para subscribirnos nuevamente
  //       map((data) => {
  //         console.log(data);


  //         // this.chats = mensajes;
  //         this.chats = [];
  //         for (const mensaje of data) {

  //           //insertado el mensaje en la primera posicion 
  //           // this.chats.unshift(mensaje);

  //           this.chat = mensaje.payload.doc.data();
  //           this.chat.doc = mensaje.payload.doc.id;
  //           this.chats.unshift(this.chat);

  //         }
  //         // return this.chats;
  //       }));

  // }











  cargarMensajes() {



    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc'));

    return this.itemsCollection.snapshotChanges().pipe(map(data => {
      this.chats = [];

      for (const mensaje of data) {
        this.chat = mensaje.payload.doc.data();
        this.chat.doc = mensaje.payload.doc.id;
        this.chats.unshift(this.chat);
        console.log(this.chats);


      }
    }));



  }




  borrarMensaje(chat: Mensaje) {
    this.itemsCollection.doc(chat.doc).delete();
    console.log('El mensaje se ha elminado');
  }


  agregarMensaje(texto: string) {

    // enviando la estructura del objeto para poder guardarla
    let mensaje: Mensaje = {
      nombre: this.usuarioLogin.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      fechaOficial: moment().format('MMMM Do YYYY | h:mm a'),
      uid: this.usuarioLogin.uid
    };

    // haciendo una insercion en 'Firebase'
    return this.itemsCollection.add(mensaje);

  }


  login(proveedor: string) {


    if (proveedor === 'google') {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    else {
      this.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
  }
  logout() {
    this.usuarioLogin = {};
    this.auth.signOut();
  }



  // public arrayDuplicados() {


  //   this.newArrName = Array.from(new Set(this.chats));

  //   for (let i = 0; i < this.newArrName; i++) {

  //     console.log(this.newArrName[0].nombre);
  //     // return this.newArrName;
  //   }
  //   //     this.newArrName.forEach((elemento: any, indice: any) => {
  //   //       console.log(`${indice} -  ${elemento}`);

  //   //  });

  //   // for (const itemName of this.chats) {

  //   //   console.log(itemName);

  //   // }

  // }
}



