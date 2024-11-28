import { Component, ChangeDetectorRef, OnInit, ViewChild  } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { ConfirmationService, MessageService } from 'primeng/api'; 
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../../core/services/task/task.service';
import { CategoryOption } from '../../../../core/models/category-option.model';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

// Autor: Roberto Cabrera C.
// Descripción: Este componente listado de tareas

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TaskDashboardComponent implements OnInit{
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;  // Obtén referencia al formulario

  tasks: Task[] = []; 
  selectedTask: Task = this.createEmptyTask();
  displayDialog: boolean = false;

  filteredTasks: Task[] = [];
  selectedCategory: string = ''; 
  categoryOptions: CategoryOption[] = [];

  sortField: string = 'creacion';  
  sortOrder: number = 1; 
 
  constructor(private taskService: TaskService, 
      private cdr: ChangeDetectorRef ,  
      private toastr: ToastrService,
      private confirmationService: ConfirmationService, 
      private messageService: MessageService,
      private taskOptionsService: TaskOptionsService) {

  }

 
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    })
    this.categoryOptions = this.taskOptionsService.getCategoriaOptions();
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
          this.clearFilter() ;
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
    this.resetForm(); 
  }

  onEditTask(task: Task) {
    this.selectedTask = { ...task };
    this.displayDialog = true;
    if (this.taskFormComponent) {
      this.taskFormComponent.taskForm.patchValue(this.selectedTask);
    }
  }

  resetForm() {
    if (this.taskFormComponent) {
      this.taskFormComponent.resetForm();  
    }
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
            this.clearFilter() ;
          } else {
            const response = await this.taskService.updateTask(task);
            this.displayDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Tarea actualizada',
              detail: `La tarea "${task.titulo}" fue actualizada exitosamente.`,
            });
            this.clearFilter() ;
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

  private createEmptyTask(): Task {
    return {
      id: '',
      titulo: '',
      descripcion: '',
      prioridad: 'Media',
      estado: 'Pendiente',
      creacion:  new Date(),
      vencimiento: new Date(),
      categoria: 'Personales',
      asignado: '',
      comentario: '',
      progreso: 0,
      idusuario :'',
    };
  }

  getPriorityClass(priority: 'Alta' | 'Media' | 'Baja'): string {
    switch (priority) {
      case 'Alta':
        return 'p-badge-danger';  
      case 'Media':
        return 'p-badge-warning';  
      case 'Baja':
        return 'p-badge-success';  
      default:
        return '';
    }
  }

  getStatusClass(status: 'Pendiente' | 'En progreso' | 'Completada'): string {
    switch (status) {
      case 'Pendiente':
        return 'p-badge-warning';  
      case 'En progreso':
        return 'p-badge-info';   
      case 'Completada':
        return 'p-badge-success';  
      default:
        return '';
    }
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.filteredTasks = this.tasks.filter(task => task.categoria === this.selectedCategory);
    } else {
      this.filteredTasks = this.tasks; 
    }
  }

  onSort(field: string): void {
    this.sortField = field;  
    this.sortOrder = (this.sortOrder === 1) ? -1 : 1;  
  }

  clearFilter(): void {
    this.selectedCategory = ''; 
    
    this.filteredTasks = this.tasks; 
    
    this.filterByCategory(); 
  }
}
