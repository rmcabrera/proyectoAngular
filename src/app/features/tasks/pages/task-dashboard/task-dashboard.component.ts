import { Component } from '@angular/core';
import { collection, getDocs, doc, deleteDoc, setDoc, getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { Task } from '../../../../core/models/task.model';
import { TimestampToDatePipe } from '../../../../shared/pipes/timestamp-to-date.pipe';
@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent {
 
  tasks: Task[] = []; 

  newTask: Task = {
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
    progreso: 0
  };

  display: boolean = false;
  searchQuery: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
  priorityOptions = [{ label: 'Alta', value: 'Alta' }, { label: 'Media', value: 'Media' }, { label: 'Baja', value: 'Baja' }];
  statusOptions = [{ label: 'Pendiente', value: 'Pendiente' }, { label: 'En progreso', value: 'En progreso' }, { label: 'Completada', value: 'Completada' }];

  

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const db = this.firebaseService.getFirestoreInstance(); 

    getDocs(collection(db, 'tareas')).then((querySnapshot) => {
      this.tasks = []; 

      querySnapshot.forEach((doc) => {
       
        const taskData = doc.data() as Task;
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
        
        this.tasks.push(task); // Agregar la tarea al array de tareas
        console.log(doc.id, ' => ', task); // Imprimir la tarea en consola
      });
    }).catch(error => {
      console.error("Error getting documents: ", error);
    });
  }

  onEditTask(task: Task) {
    this.newTask = { ...task }; // Copia de la tarea seleccionada
    this.display = true;
  }

  onDeleteTask(taskId: number) {
    const db = this.firebaseService.getFirestoreInstance();
    deleteDoc(doc(db, 'tareas', taskId.toString())).then(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

  showDialog() {
    console.log("nuevo")
  }

  saveTask() {
    // Lógica para guardar o actualizar la tarea en Firebase
    this.display = false;
  }

  hideDialog() {
    this.display = false;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
  }

  /*
  loadData() {
    const db = this.firebaseService.getFirestoreInstance();

    getDocs(collection(db, 'tareas')).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    });

    setDoc(doc(db, 'tareas', 'new-doc'), {
      titulo: 'Nuevo documento',
      estado : 'false',
      prioridad: 'Baja'
    });
  }
 */
/*
  filteredTasks = [...this.tasks];

  display: boolean = false;
  newTask = { title: '', priority: '', completed: false, dueDate: null };

  searchQuery: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';

  priorityOptions = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' },
  ];

  statusOptions = [
    { label: 'Pendiente', value: false },
    { label: 'Completada', value: true },
  ];


  showDialog() {
    this.newTask = { title: '', priority: '', completed: false, dueDate: null }; 
    this.display = true;
  }


  hideDialog() {
    this.display = false;
  }


  saveTask() {
    if (this.newTask.title.trim() && this.newTask.priority) {
      const id = this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
      this.filteredTasks = [...this.tasks]; 
      this.hideDialog();
    }
  }


  onEditTask(task: any) {
    this.newTask = { ...task }; 
    this.display = true;
  }

 
  onDeleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.filteredTasks = [...this.tasks]; 
  }


  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch = this.searchQuery
        ? task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      const matchesPriority = this.selectedPriority
        ? task.priority === this.selectedPriority
        : true;

 
      return matchesSearch && matchesPriority ;
    });
  }


  clearFilters() {
    this.searchQuery = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
    this.filteredTasks = [...this.tasks]; 
  }*/

}
