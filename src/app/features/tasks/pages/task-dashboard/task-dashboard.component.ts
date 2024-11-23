import { Component } from '@angular/core';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent {
  tasks = [
    { id: 1, title: 'Tarea 1', completed: false },
    { id: 2, title: 'Tarea 2', completed: true },
    { id: 3, title: 'Tarea 3', completed: false },
  ];
  
  // Variables para el cuadro de diálogo
  display: boolean = false;
  newTask = { title: '', completed: false };

  // Opciones para el dropdown de estado
  statusOptions = [
    { label: 'Pendiente', value: false },
    { label: 'Completada', value: true },
  ];

  // Mostrar el cuadro de diálogo
  showDialog() {
    this.display = true;
  }

  // Ocultar el cuadro de diálogo
  hideDialog() {
    this.display = false;
  }

  // Guardar la nueva tarea
  saveTask() {
    if (this.newTask.title.trim()) {
      const id = this.tasks.length + 1;
      this.tasks.push({ id, ...this.newTask });
      this.newTask = { title: '', completed: false };
      this.hideDialog();
    }
  }

  // Editar una tarea
  onEditTask(task: any) {
    // Lógica para editar la tarea
  }

  // Eliminar una tarea
  onDeleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
