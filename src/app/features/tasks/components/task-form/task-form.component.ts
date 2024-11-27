import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { PriorityOption } from '../../../../core/models/priority-option.model';
import { StatusOption } from '../../../../core/models/status-option.model';
import { CategoryOption } from '../../../../core/models/category-option.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  @Input() task: Task = {
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
  };

  @Input() display: boolean = false; 
  @Output() displayChange = new EventEmitter<boolean>(); 

  @Output() save = new EventEmitter<Task>(); 
  @Output() cancel = new EventEmitter<void>(); 

  
  priorityOptions: PriorityOption[] = [];
  statusOptions: StatusOption[] = [];
  categoriaOptions: CategoryOption[] = [];

  
  constructor(private taskOptionsService: TaskOptionsService) {}

  ngOnInit() {

    this.priorityOptions = this.taskOptionsService.getPriorityOptions();
    this.statusOptions = this.taskOptionsService.getStatusOptions();
    this.categoriaOptions = this.taskOptionsService.getCategoriaOptions();
  }
  
  onSave() {
    this.save.emit(this.task); 
  }

  onCancel() {
    this.cancel.emit(); 
    this.onCloseDialog(); 
  }

  onCloseDialog() {
    this.displayChange.emit(false); 
  }

}
