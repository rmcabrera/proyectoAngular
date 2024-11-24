import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  @Input() task: Task = {
    id: 0,
    titulo: '',
    descripcion: '',
    prioridad: 'Media',
    estado: 'Pendiente',
    creacion: new Date(),
    vencimiento: new Date(),
    categoria: '',
    asignado: '',
    comentario: '',
    progreso: 0
  };

  @Input() display: boolean = false; 
  @Output() displayChange = new EventEmitter<boolean>(); 

  @Output() save = new EventEmitter<Task>(); 
  @Output() cancel = new EventEmitter<void>(); 

  priorityOptions = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' }
  ];

  statusOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En progreso', value: 'En progreso' },
    { label: 'Completada', value: 'Completada' }
  ];

  minDate: Date = new Date();
  
  onSave() {
    this.save.emit(this.task); 
    this.onCloseDialog(); 
  }

  onCancel() {
    this.cancel.emit(); 
    this.onCloseDialog(); 
  }

  onCloseDialog() {
    this.displayChange.emit(false); 
  }

}
