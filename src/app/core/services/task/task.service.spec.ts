import { TestBed } from '@angular/core/testing';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TaskService } from './task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';
import { Timestamp } from 'firebase/firestore';

class MockAngularFireAuth {
  authState = of({ uid: 'mockUserId' });
  currentUser = Promise.resolve({ uid: 'mockUserId' });
}

describe('TaskService', () => {
  let service: TaskService;
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: Firestore, useValue: {} },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
      ]
    });
    service = TestBed.inject(TaskService);
    firestore = TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks for the authenticated user', (done) => {
    const mockTasks: Task[] = [
      {
        id: '1',
        titulo: 'Task 1',
        descripcion: 'Description 1',
        prioridad: 'Alta',
        estado: 'Pendiente',
        creacion: new Date(),
        vencimiento: new Date(),
        categoria: 'Personales',
        asignado: 'user1',
        comentario: 'Test comment',
        progreso: 50,
        idusuario: 'mockUserId'
      },
      {
        id: '2',
        titulo: 'Task 2',
        descripcion: 'Description 2',
        prioridad: 'Media',
        estado: 'En progreso',
        creacion: new Date(),
        vencimiento: new Date(),
        categoria: 'Laborales',
        asignado: 'user1',
        comentario: 'Test comment 2',
        progreso: 70,
        idusuario: 'mockUserId'
      }
    ];

    spyOn(service, 'getTasks').and.returnValue(of(mockTasks));

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks[0].titulo).toBe('Task 1');
      done();
    });
  });

});
