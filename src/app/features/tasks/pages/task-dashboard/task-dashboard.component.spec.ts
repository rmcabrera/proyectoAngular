import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDashboardComponent } from './task-dashboard.component';
import { TaskService } from '../../../../core/services/task/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { TaskOptionsService } from '../../../../core/services/task/task-options.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { of } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { TimestampToDatePipe } from '../../../../shared/pipes/timestamp-to-date.pipe';
import { ProgressBarModule } from 'primeng/progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

class MockTaskService {
  getTasks = jasmine.createSpy().and.returnValue(of([{
    id: '1',
    titulo: 'Test Task',
    descripcion: 'Test task description',
    prioridad: 'Alta',
    estado: 'Pendiente',
    creacion: new Date(),
    vencimiento: new Date(),
    categoria: 'Trabajo',
    asignado: 'User1',
    comentario: 'Test comment',
    progreso: 0,
    idusuario: 'user1'
  }]));

  addTask = jasmine.createSpy().and.callFake((task) => Promise.resolve(task));
  updateTask = jasmine.createSpy().and.callFake((task) => Promise.resolve(task));
  deleteTask = jasmine.createSpy().and.callFake((task) => Promise.resolve(task));
}

class MockConfirmationService {
  confirm = jasmine.createSpy().and.callFake((config: any) => {
    if (config.accept) {
      config.accept();
    }
  });
}

class MockMessageService {
  add = jasmine.createSpy();
}

class MockToastrService {
  success = jasmine.createSpy();
  error = jasmine.createSpy();
}

class MockTaskOptionsService {
  getCategoriaOptions = jasmine.createSpy().and.returnValue([]);
  getPriorityOptions = jasmine.createSpy().and.returnValue(['Alta', 'Media', 'Baja']);
  getStatusOptions = jasmine.createSpy().and.returnValue(['Pendiente', 'En progreso', 'Completada']);
}

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;
  let taskService: MockTaskService;
  let confirmationService: MockConfirmationService;
  let messageService: MockMessageService;
  let toastrService: MockToastrService;
  let taskOptionsService: MockTaskOptionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDashboardComponent, TaskFormComponent, TimestampToDatePipe,
          TruncatePipe
       ],
      imports: [
        DialogModule,
        DropdownModule,
        CalendarModule,
        SliderModule,
        FormsModule,
        ReactiveFormsModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        ToastModule,
        BadgeModule,
        ProgressBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: ConfirmationService, useClass: MockConfirmationService },
        { provide: MessageService, useClass: MockMessageService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: TaskOptionsService, useClass: MockTaskOptionsService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as any;
    confirmationService = TestBed.inject(ConfirmationService) as any;
    messageService = TestBed.inject(MessageService) as any;
    toastrService = TestBed.inject(ToastrService) as any;
    taskOptionsService = TestBed.inject(TaskOptionsService) as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks on init', () => {
    expect(taskService.getTasks).toHaveBeenCalled();
  });

 
});
