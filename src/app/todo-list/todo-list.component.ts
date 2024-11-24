import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './tasks.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  lista_tareas:any[] = [];
  task_input:any;
  description_task_input:any;

  constructor(private task_api: TaskService ){}

  ngOnInit() {
    this.obtener_listado_tareas();
  }


  obtener_listado_tareas(){
    this.task_api.get_tasks().subscribe((data:any) => {
      this.lista_tareas = data;
      console.log(data);
    })
  }

  es_vacio_listado_tareas(){
    return this.lista_tareas.length > 0;
  }

  crear_tarea(){
    let new_task = {
      title:this.task_input,
      description:this.description_task_input
    }

    this.task_api.create_task(new_task)
    .subscribe(
      (respuesta:any) => {
        this.lista_tareas.push(new_task);
        Swal.fire({
          title: respuesta.mensaje,
          icon: respuesta.icon,
          confirmButtonText: 'Ok'
        })
      },
      error => {
        Swal.fire({
          title: error.mensaje,
          icon: error.icono,
          confirmButtonText: 'Ok'
        })
      }
    )
  }

  eliminar_tarea(id:number){
    this.task_api.delete_task(id)
    .subscribe(
      (respuesta:any) => {
        this.lista_tareas =  this.lista_tareas.filter((task) => {
          return task.id != id;
        })

        Swal.fire({
          title: respuesta.mensaje,
          icon: respuesta.icon,
          confirmButtonText: 'Ok'
        })
      },
      error => {
        Swal.fire({
          title: "No se pudo elimnar la tarea",
          icon: "error",
          confirmButtonText: 'Ok'
        })
      }
    )
  }
}
