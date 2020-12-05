import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje = '';

  elemento: any;


  constructor(public chatService: ChatService) {



    //cargando el metodo creado en el serrivio para subscribirnos al metodo y traer el nodo de registro de los 'chats'

    this.chatService.cargarMensajes().subscribe(() => {
      /*(mensajes: any[]) => {   console.log(mensajes);   }*/

      //al momento de recibir los mensajes
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });

  }

  ngOnInit(): void {

    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {

    console.log(this.mensaje);


    // Validando que exista un mensaje
    if (this.mensaje.length === 0) {
      return;
    }

    // si existe algo
    this.chatService.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = '') //si el mensaje se envia correctamente
      .catch((err) => console.error('Error al enviar', err)); // en el caso que no se pueda enviar el mensaje
  }


  eliminarMensaje(chat: any) {




    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Está seguro?',
      text: `Está seguro que desea borar "${chat.mensaje}"`,
      showConfirmButton: true,
      showCancelButton: true

      // Depende de lo que la persona responda , se borrara o no
    }).then(resp => {

      if (resp.value) {//Si el usario responde que si quiere borarlo

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mensaje borrado',
          text: `Se ha borrado correctamente`,
        });

        return this.chatService.borrarMensaje(chat);

      } else {

        return false;
      }
    });

  }


}
