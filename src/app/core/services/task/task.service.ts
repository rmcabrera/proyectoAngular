import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, Timestamp } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';

// Autor: Roberto Cabrera C.
// Descripción: Este servicio maneja el CRUD de las tareas

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore) {

   }

  getTasks(): Observable<Task[]> {
    const taskRef = collection(this.firestore, 'tareas');
    
    return collectionData(taskRef, { idField: 'id' }).pipe(
      map((tasks: Task[]) => {
        return tasks.map((task) => {
          if (task.creacion instanceof Timestamp) {
            task.creacion = task.creacion.toDate();  
          }

          if (task.vencimiento instanceof Timestamp) {
            task.vencimiento = task.vencimiento.toDate(); 
          }

          return task;
        });
      })
    );
  }

  deleteTask(task: Task) {
    const taskDocRef = doc(this.firestore, `tareas/${task.id}`);
    return deleteDoc(taskDocRef);
  }

  addTask(task: Task) {
    const taskRef = collection(this.firestore, 'tareas');
    return addDoc(taskRef, task);
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
      progreso: task.progreso
    });
  }

}
