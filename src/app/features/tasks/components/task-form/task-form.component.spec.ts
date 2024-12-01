import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { FormBuilder } from '@angular/forms';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';
import { Task } from '../../../../core/models/task.model';
import { PriorityOption } from '../../../../core/models/priority-option.model';
import { StatusOption } from '../../../../core/models/status-option.model';
import { CategoryOption } from '../../../../core/models/category-option.model';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskOptionsService: TaskOptionsService;

  const mockTask: Task = {
    id: '1',
    titulo: 'Test Task',
    descripcion: 'This is a test task.',
    prioridad: 'Alta',
    estado: 'Pendiente',
    creacion: new Date(),
    vencimiento: new Date(),
    categoria: 'Personales',
    asignado: 'user1',
    comentario: 'Test comment',
    progreso: 50,
    idusuario: 'user1'
  };

  const priorityOptions: PriorityOption[] = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' }
  ];

  const statusOptions: StatusOption[] = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En progreso', value: 'En progreso' },
    { label: 'Completada', value: 'Completada' }
  ];

  const categoryOptions: CategoryOption[] = [
    { label: 'Personales', value: 'Personales' },
    { label: 'Laborales', value: 'Laborales' },
    { label: 'Fiscalización', value: 'Fiscalización' },
    { label: 'Auditoría', value: 'Auditoría' },
    { label: 'Administrativa', value: 'Administrativa' },
    { label: 'Gestión de tributos', value: 'Gestión de tributos' },
    { label: 'Otros', value: 'Otros' }
  ];

  beforeEach(async () => {
    // Mock del servicio TaskOptionsService
    const taskOptionsServiceMock = {
      getPriorityOptions: () => priorityOptions,  
      getStatusOptions: () => statusOptions,      
      getCategoriaOptions: () => categoryOptions 
    };

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        DialogModule, 
        DropdownModule, 
        CalendarModule, 
        SliderModule,
        FormsModule, 
        ReactiveFormsModule
      ], 
      providers: [
        { provide: TaskOptionsService, useValue: taskOptionsServiceMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskOptionsService = TestBed.inject(TaskOptionsService);

    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize form correctly in ngOnInit', () => {
    component.ngOnInit();
  
    fixture.detectChanges();
  
    expect(component.priorityOptions.length).toBeGreaterThan(0); 
    expect(component.statusOptions.length).toBeGreaterThan(0);   
    expect(component.categoriaOptions.length).toBeGreaterThan(0); 
  
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.valid).toBeFalse(); 
  });
    
  it('should initialize form with task data on input change', () => {
    component.task = mockTask;
    component.ngOnChanges({
      task: { currentValue: mockTask, previousValue: null, firstChange: true, isFirstChange: () => true }
    });

    fixture.detectChanges();

    expect(component.taskForm.value.titulo).toBe('Test Task');
    expect(component.taskForm.value.descripcion).toBe('This is a test task.');
  });

  it('should populate options correctly from TaskOptionsService', () => {
    
    component.ngOnInit(); 

    fixture.detectChanges();

    
    expect(component.priorityOptions).toEqual(priorityOptions);
    expect(component.statusOptions).toEqual(statusOptions);
    expect(component.categoriaOptions).toEqual(categoryOptions);
  });

  it('should not call save if form is invalid', () => {
    component.taskForm.setValue({
      id: '1',
      titulo: '',
      descripcion: 'Invalid task with no title.',
      prioridad: 'Alta',
      estado: 'Pendiente',
      creacion: new Date(),
      vencimiento: new Date(),
      categoria: 'Personales',
      asignado: 'user1',
      comentario: 'Invalid comment',
      progreso: 50,
      idusuario: 'user1'
    });

    spyOn(component.save, 'emit'); 

    component.onSave();

    expect(component.save.emit).not.toHaveBeenCalled(); 
  });

  it('should call cancel when cancel button is clicked', () => {
    spyOn(component.cancel, 'emit'); 

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should reset form when resetForm is called', () => {
    component.taskForm.setValue({
      id: '1',
      titulo: 'Reset Task',
      descripcion: 'This task will be reset.',
      prioridad: 'Alta',
      estado: 'Pendiente',
      creacion: new Date(),
      vencimiento: new Date(),
      categoria: 'Personales',
      asignado: 'user1',
      comentario: 'Reset comment',
      progreso: 50,
      idusuario: 'user1'
    });

    component.resetForm();

    expect(component.taskForm.pristine).toBeTrue(); 
    expect(component.taskForm.touched).toBeFalse(); 
  });

  it('should emit false when onCloseDialog is called', () => {
    spyOn(component.displayChange, 'emit');
    component.onCloseDialog();
    expect(component.displayChange.emit).toHaveBeenCalledWith(false);
  });
  
  it('should set display to false when cancel is called', () => {
    spyOn(component.displayChange, 'emit');
    component.onCancel();
    expect(component.displayChange.emit).toHaveBeenCalledWith(false);
  });

  
});
