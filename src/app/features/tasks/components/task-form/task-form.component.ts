import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { PriorityOption } from '../../../../core/models/priority-option.model';
import { StatusOption } from '../../../../core/models/status-option.model';
import { CategoryOption } from '../../../../core/models/category-option.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task = {
    id: '',
    titulo: '',
    descripcion: '',
    prioridad: 'Media',
    estado: 'Pendiente',
    creacion: new Date(),
    vencimiento: new Date(),
    categoria: 'Personales',
    asignado: '',
    comentario: '',
    progreso: 0,
    idusuario: ''
  };

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  taskForm: FormGroup;
  priorityOptions: PriorityOption[] = [];
  statusOptions: StatusOption[] = [];
  categoriaOptions: CategoryOption[] = [];
  avatarUrl = environment.defaultAvatar;

  constructor(
    private taskOptionsService: TaskOptionsService,
    private fb: FormBuilder
  ) {
   
    this.taskForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      prioridad: ['Media', Validators.required],
      estado: ['Pendiente', Validators.required],
      creacion: [new Date(), Validators.required],
      vencimiento: [new Date(), Validators.required],
      categoria: ['Personales', Validators.required],
      asignado: ['', [Validators.required, Validators.minLength(10)]],
      comentario: [''],
      progreso: [0],
      idusuario: [null]
    });
  }

  ngOnInit(): void {
    this.priorityOptions = this.taskOptionsService.getPriorityOptions();
    this.statusOptions = this.taskOptionsService.getStatusOptions();
    this.categoriaOptions = this.taskOptionsService.getCategoriaOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.taskForm.patchValue(this.task); 
    }  
    
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value); 
    } else {
      this.taskForm.markAllAsTouched(); 
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.onCloseDialog();
  }

  onCloseDialog(): void {
    this.displayChange.emit(false);
  }

  resetForm() {
    this.taskForm.reset(); 
    this.taskForm.markAsPristine(); 
    this.taskForm.markAsUntouched(); 
    this.taskForm.updateValueAndValidity(); 
  }

}
