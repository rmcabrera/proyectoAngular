import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task/task.service';
import { Task } from '../../../../core/models/task.model';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';

@Component({
  selector: 'app-task-kanban-board',
  templateUrl: './task-kanban-board.component.html',
  styleUrls: ['./task-kanban-board.component.css']
})
export class TaskKanbanBoardComponent implements OnInit {
  estados: string[] = []; 
  tareas: { [key: string]: Task[] } = {}; 

  constructor(private taskService: TaskService, private taskOptionsService: TaskOptionsService) {}

  ngOnInit() {
    this.estados = this.taskOptionsService
      .getStatusOptions()
      .map((estado) => estado.value);

    this.estados.forEach((estado) => {
      this.tareas[estado] = [];
    });

   
    this.taskService.getTasks().subscribe((datos) => {
    
      this.estados.forEach((estado) => {
        this.tareas[estado] = []; 
      });

      datos.forEach((tarea) => {
        if (this.tareas[tarea.estado]) {
          this.tareas[tarea.estado].push(tarea);
        }
      });
    });
  }

  moverTarea(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const tarea = event.item.data as Task;
      const nuevoEstado = event.container.id;
      const updatedTask: Task = { ...tarea, estado: nuevoEstado };

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,         
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.updateTask(updatedTask).then(() => {
        console.log('Tarea actualizada en Firestore:', updatedTask);
      }).catch((error) => {
        console.error('Error al actualizar la tarea en Firestore:', error);

        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      });
    }
  }
}
