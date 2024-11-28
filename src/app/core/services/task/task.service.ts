import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, Timestamp, docData } from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { Task } from '../../models/task.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Autor: Roberto Cabrera C.
// Descripción: Este servicio maneja el CRUD de las tareas

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore, private afAuth: AngularFireAuth) {

   }

   getTasks(): Observable<Task[]> {
    const taskRef = collection(this.firestore, 'tareas');

    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return collectionData(taskRef, { idField: 'id' }).pipe(
            map((tasks: Task[]) => 
              tasks
                .filter((task) => task.idusuario === user.uid) 
                .map((task) => {
                  if (task.creacion instanceof Timestamp) {
                    task.creacion = task.creacion.toDate();
                  }

                  if (task.vencimiento instanceof Timestamp) {
                    task.vencimiento = task.vencimiento.toDate();
                  }

                  return task;
                })
            )
          );
        } else {
          return []; 
        }
      })
    );
  }

  deleteTask(task: Task) {
    const taskDocRef = doc(this.firestore, `tareas/${task.id}`);
    return deleteDoc(taskDocRef);
  }

  async addTask(task: Task) {
    const taskRef = collection(this.firestore, 'tareas');
    const user = await this.afAuth.currentUser; 

    if (user) {
      task.idusuario = user.uid; 
      return addDoc(taskRef, task);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  updateTask(task: Task) {
    const taskDoc = doc(this.firestore, 'tareas', task.id!);
    return updateDoc(taskDoc, {
      titulo: task.titulo,
      descripcion: task.descripcion,
      prioridad: task.prioridad,
      estado: task.estado,
      creacion: task.creacion,
      vencimiento: task.vencimiento,
      categoria: task.categoria,
      asignado: task.asignado,
      comentario: task.comentario,
      progreso: task.progreso,
      idusuario: task.idusuario
    });
  }

  getTaskById(id: string): Observable<Task> {
    const taskRef = doc(this.firestore, `tareas/${id}`);
    return docData(taskRef, { idField: 'id' }).pipe(
      map((task: Task) => {
        if (task.creacion instanceof Timestamp) {
          task.creacion = task.creacion.toDate();
        }
        if (task.vencimiento instanceof Timestamp) {
          task.vencimiento = task.vencimiento.toDate();
        }
        return task;
      })
    );
  }
  

}
