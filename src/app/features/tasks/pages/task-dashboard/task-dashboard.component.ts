import { Component, ChangeDetectorRef, OnInit  } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { ConfirmationService, MessageService } from 'primeng/api'; 
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../../core/services/task/task.service';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TaskDashboardComponent implements OnInit{
 
  tasks: Task[] = []; 
  selectedTask: Task = this.createEmptyTask();
  displayDialog: boolean = false;

  display: boolean = false;
  searchQuery: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
 
  constructor(private taskService: TaskService, 
      private cdr: ChangeDetectorRef ,  
      private toastr: ToastrService,
      private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

 
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  async onDeleteTask(task: Task) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar esta tarea?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        try {
          const response = await this.taskService.deleteTask(task);
          this.messageService.add({
            severity: 'success',
            summary: 'Tarea eliminada',
            detail: `La tarea "${task.titulo}" fue eliminada exitosamente.`,
          });
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la tarea.',
          });
        }
      },
      reject: () => {
        console.log('Eliminación cancelada');
      },
    });
  }
  
  openNewTask() {
    this.selectedTask = this.createEmptyTask();
    this.displayDialog = true;
  }

  onEditTask(task: Task) {
    this.selectedTask = { ...task };
    this.displayDialog = true;
  }


  saveTask(task: Task) {

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea guardar esta tarea?',
      header: 'Confirmación de guardado',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Sí',  
      rejectLabel: 'No',  
      acceptIcon: 'pi pi-check',  
      rejectIcon: 'pi pi-times', 
      accept: async () => {
        try {
          if (!task.id) { 
            const response = await this.taskService.addTask(task);
            this.displayDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Tarea creada',
              detail: `La tarea "${task.titulo}" fue creada exitosamente.`,
            });
          } else {
            const response = await this.taskService.updateTask(task);
            this.displayDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Tarea actualizada',
              detail: `La tarea "${task.titulo}" fue actualizada exitosamente.`,
            });
          }
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se puedo guardar la tarea.',
          });
        }
      },
      reject: () => {
        console.log('Guardado cancelado');
      },
    });
  }

  hideDialog() {
    this.displayDialog = false;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
  }

  private createEmptyTask(): Task {
    return {
      id: '',
      titulo: '',
      descripcion: '',
      prioridad: 'Media',
      estado: 'Pendiente',
      creacion:  new Date(),
      vencimiento: new Date(),
      categoria: '',
      asignado: '',
      comentario: '',
      progreso: 0,
    };
  }

}
