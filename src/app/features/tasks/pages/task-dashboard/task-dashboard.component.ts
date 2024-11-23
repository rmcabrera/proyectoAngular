import { Component } from '@angular/core';
import { collection, getDocs, doc, setDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent {
 
  tasks = [
    { id: 1, title: 'Tarea 1', priority: 'Alta', completed: false, dueDate: new Date('2023-12-01') },
    { id: 2, title: 'Tarea 2', priority: 'Media', completed: true, dueDate: new Date('2023-11-30') },
    { id: 3, title: 'Tarea 3', priority: 'Baja', completed: false, dueDate: new Date('2023-12-10') },
  ];

  constructor() {
    
    const db = getFirestore();

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
  }
}
