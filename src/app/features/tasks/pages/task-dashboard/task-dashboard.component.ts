import { Component, ChangeDetectorRef  } from '@angular/core';
import { collection, getDocs, doc, deleteDoc,  addDoc, updateDoc, setDoc, getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent {
 
  tasks: Task[] = []; 
  selectedTask: Task = this.createEmptyTask();
  displayDialog: boolean = false;

  display: boolean = false;
  searchQuery: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
 
  constructor(private firebaseService: FirebaseService, private cdr: ChangeDetectorRef ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const db = this.firebaseService.getFirestoreInstance(); 
    
    getDocs(collection(db, 'tareas')).then((querySnapshot) => {
      this.tasks = []; 
      let index = 0;
      querySnapshot.forEach((doc) => {
        index ++ ;
        const taskData = doc.data() as Task;
        taskData.id = index;
        const task: Task = {
          id: taskData.id,
          titulo: taskData.titulo,
          descripcion: taskData.descripcion || '', 
          prioridad: taskData.prioridad,
          estado: taskData.estado,
          creacion: taskData.creacion ? taskData.creacion : new Date(),
          vencimiento: taskData.vencimiento ? taskData.vencimiento: new Date(),
          categoria: taskData.categoria || '',
          asignado: taskData.asignado || '',
          comentario: taskData.comentario || '',
          progreso: taskData.progreso || 0
        };
        
        this.tasks.push(task); 
        console.log(doc.id, ' => ', task); 
      });
    }).catch(error => {
      console.error("Error obtener registros: ", error);
    });
  }

  openNewTask() {
    this.selectedTask = this.createEmptyTask();
    this.displayDialog = true;
    this.cdr.detectChanges();
  }

  onEditTask(task: Task) {
    this.selectedTask = { ...task };
    this.displayDialog = true;
    this.cdr.detectChanges();
  }

  onDeleteTask(taskId: number) {
    const db = this.firebaseService.getFirestoreInstance();
    deleteDoc(doc(db, 'tareas', taskId.toString())).then(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

  saveTask(task: Task) {

    const db = this.firebaseService.getFirestoreInstance();
    if (task.id === 0) {
      // Lógica para crear nueva tarea con un ID autogenerado
      const taskRef = collection(db, 'tareas');
      addDoc(taskRef, {
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
      })
      .then((docRef) => {
        console.log("Tarea guardada con ID:", docRef.id);
        task.id = parseInt(docRef.id, 10); 
        this.tasks.push(task);
        this.displayDialog = false;
      })
      .catch((error) => {
        console.error("Error al guardar la tarea:", error);
      });
    } else {
      // Lógica para actualizar tarea existente
      const taskRef = doc(db, 'tareas', task.id.toString());
      updateDoc(taskRef, {
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
      })
      .then(() => {
        console.log("Tarea actualizada con ID:", task.id);
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = task; // Actualizar tarea en la lista
        }
        this.displayDialog = false;
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea:", error);
      });
    }
//    this.tasks = [];
//    this.loadData();
    this.displayDialog = false;
  }

  
  hideDialog() {
    this.displayDialog = false;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
  }

  private createEmptyTask(): Task {
    return {
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
      progreso: 0,
    };
  }

}
