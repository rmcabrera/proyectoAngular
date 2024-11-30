import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskKanbanBoardComponent } from './task-kanban-board.component';
import { TaskService } from '../../../../core/services/task/task.service';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { of } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../../../core/models/task.model';
import { ToolbarModule } from 'primeng/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

describe('TaskKanbanBoardComponent', () => {
  let component: TaskKanbanBoardComponent;
  let fixture: ComponentFixture<TaskKanbanBoardComponent>;
  let taskServiceStub: Partial<TaskService> & { updateTask: (task: Task) => Promise<void> };
  let taskOptionsServiceStub: Partial<TaskOptionsService>;

  beforeEach(async () => {
    taskServiceStub = {
      getTasks: () => of([
        { id: '1', titulo: 'Test Task 1', descripcion: 'Desc 1', prioridad: 'Alta', estado: 'Pendiente', creacion: new Date(), vencimiento: new Date(), categoria: 'Personales', asignado: 'User1', comentario: 'Comm 1', progreso: 0, idusuario: '1' },
        { id: '2', titulo: 'Test Task 2', descripcion: 'Desc 2', prioridad: 'Baja', estado: 'Completada', creacion: new Date(), vencimiento: new Date(), categoria: 'Laborales', asignado: 'User2', comentario: 'Comm 2', progreso: 100, idusuario: '2' }
      ]),
      updateTask: (task: Task) => Promise.resolve()
    };

    taskOptionsServiceStub = {
      getStatusOptions: () => [
        { label: 'Pendiente', value: 'Pendiente' },
        { label: 'En progreso', value: 'En progreso' },
        { label: 'Completada', value: 'Completada' }
      ]
    };

    await TestBed.configureTestingModule({
      declarations: [TaskKanbanBoardComponent, TruncatePipe],
      imports : [ToolbarModule, DragDropModule],
      providers: [
        { provide: TaskService, useValue: taskServiceStub },
        { provide: TaskOptionsService, useValue: taskOptionsServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskKanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize estados from taskOptionsService', () => {
    expect(component.estados).toEqual(['Pendiente', 'En progreso', 'Completada']);
  });

  it('should initialize tareas for each estado', () => {
    expect(component.tareas['Pendiente']).toBeDefined();
    expect(component.tareas['En progreso']).toBeDefined();
    expect(component.tareas['Completada']).toBeDefined();
  });

  it('should load tasks into tareas', () => {
    expect(component.tareas['Pendiente'].length).toBe(1);
    expect(component.tareas['Completada'].length).toBe(1);
  });

  it('should update task on drag and drop', async () => {
    const event: CdkDragDrop<any[]> = {
      previousContainer: { data: component.tareas['Pendiente'], id: 'Pendiente' },
      container: { data: component.tareas['Completada'], id: 'Completada' },
      previousIndex: 0,
      currentIndex: 0,
      item: { data: component.tareas['Pendiente'][0] },
    } as CdkDragDrop<any[]>;

    spyOn(taskServiceStub, 'updateTask').and.returnValue(Promise.resolve());

    await component.moverTarea(event);

    expect(taskServiceStub.updateTask).toHaveBeenCalledWith(jasmine.objectContaining({ estado: 'Completada' }));
    expect(component.tareas['Pendiente'].length).toBe(0);
    expect(component.tareas['Completada'].length).toBe(2);
  });
});
