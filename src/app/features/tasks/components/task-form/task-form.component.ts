import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { PriorityOption } from '../../../../core/models/priority-option.model';
import { StatusOption } from '../../../../core/models/status-option.model';
import { CategoryOption } from '../../../../core/models/category-option.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Autor: Roberto Cabrera C.
// Descripción: Este componente para registro y edicion de tareas con formulario reactivo

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

  taskForm : FormGroup;
  priorityOptions: PriorityOption[] = [];
  statusOptions: StatusOption[] = [];
  categoriaOptions: CategoryOption[] = [];

  
  constructor(private taskOptionsService: TaskOptionsService,
    private fb: FormBuilder 
  ) {
    this.taskForm = this.fb.group({
      id: [this.task?.id || null], 
      titulo: [this.task?.titulo || '', Validators.required],
      descripcion: [this.task?.descripcion || '', [Validators.required, Validators.minLength(10)]],
      prioridad: [this.task?.prioridad || 'Media', Validators.required],
      estado: [this.task?.estado || 'Pendiente', Validators.required],
      creacion: [this.task?.creacion || new Date(), Validators.required],
      vencimiento: [this.task?.vencimiento || new Date(), Validators.required],
      categoria: [this.task?.categoria || 'Personales', Validators.required],
      asignado: [this.task?.asignado || '', [Validators.required, Validators.minLength(10)]],
      comentario: [this.task?.comentario || ''],
      progreso: [this.task?.progreso || 0],
    });
  }

  ngOnInit() {

    if (this.task) {
      this.taskForm.patchValue(this.task);
    }

    this.priorityOptions = this.taskOptionsService.getPriorityOptions();
    this.statusOptions = this.taskOptionsService.getStatusOptions();
    this.categoriaOptions = this.taskOptionsService.getCategoriaOptions();
  }
  
  onSave() {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value); 
    } else {
      this.taskForm.markAllAsTouched(); 
    }
  }

  onCancel() {
    this.cancel.emit(); 
    this.onCloseDialog(); 
  }

  onCloseDialog() {
    this.displayChange.emit(false); 
  }

}
