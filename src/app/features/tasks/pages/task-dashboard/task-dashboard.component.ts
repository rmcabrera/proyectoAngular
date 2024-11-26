import { Component, ChangeDetectorRef  } from '@angular/core';
import { collection, getDocs, doc, deleteDoc,  addDoc, updateDoc, setDoc, getFirestore } from 'firebase/firestore';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { Task } from '../../../../core/models/task.model';
import { ConfirmationService, MessageService } from 'primeng/api'; 
import { Timestamp } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TaskDashboardComponent {
 
  tasks: Task[] = []; 
  selectedTask: Task = this.createEmptyTask();
  displayDialog: boolean = false;

  display: boolean = false;
  searchQuery: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
 
  constructor(private firebaseService: FirebaseService, 
      private cdr: ChangeDetectorRef ,  
      private toastr: ToastrService,
      private confirmationService: ConfirmationService, private messageService: MessageService) {

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

        const creacion = taskData.creacion instanceof Timestamp ? taskData.creacion.toDate() : new Date();
        const vencimiento = taskData.vencimiento instanceof Timestamp ? taskData.vencimiento.toDate() : new Date();
  
        const task: Task = {
          idunique: doc.id, 
          id: taskData.id,
          titulo: taskData.titulo,
          descripcion: taskData.descripcion || '', 
          prioridad: taskData.prioridad,
          estado: taskData.estado,
    
          creacion: creacion,
          vencimiento: vencimiento,
   
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

  onDeleteTask(task: Task) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar esta tarea?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",      
      acceptLabel: 'Sí',  
      rejectLabel: 'No',   

      accept: () => {
        const db = this.firebaseService.getFirestoreInstance();
        deleteDoc(doc(db, 'tareas', task.idunique)).then(() => {
          this.tasks = this.tasks.filter(t => t.idunique !== task.idunique); 
          this.toastr.success('Operación exitosa', 'Exito');
          console.log('Tarea eliminada:', task);
        }).catch(error => {
          this.toastr.error('Error al eliminar tarea', 'Error');
          console.error('Error eliminando la tarea:', error);
        });
      },
      reject: () => {
        console.log('Eliminación cancelada');
      }
    });
  }

  saveTask(task: Task) {

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea guardar esta tarea?',
      header: 'Confirmación de guardado',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Sí',  
      rejectLabel: 'No',  
      acceptIcon: 'pi pi-check',  
      rejectIcon: 'pi pi-times', 
      accept: () => {
            
        const db = this.firebaseService.getFirestoreInstance();
        if (!task.idunique) {
          // Lógica para crear nueva tarea con un ID autogenerado
          const taskRef = collection(db, 'tareas');
          const creacion = task.creacion instanceof Date ? Timestamp.fromDate(task.creacion) : null;
          const vencimiento = task.vencimiento instanceof Date ? Timestamp.fromDate(task.vencimiento) : null;
        
          addDoc(taskRef, {
            titulo: task.titulo,
            descripcion: task.descripcion,
            prioridad: task.prioridad,
            estado: task.estado,
            creacion: creacion,
            vencimiento: vencimiento,
            categoria: task.categoria,
            asignado: task.asignado,
            comentario: task.comentario,
            progreso: task.progreso
          })
          .then((docRef) => {
            this.toastr.success('Operación exitosa', 'Exito');
            console.log("Tarea guardada con ID:", docRef.id);
            console.log(task)
            task.idunique = docRef.id; 
            this.tasks.push(task);
            this.displayDialog = false;
          })
          .catch((error) => {
            this.toastr.error('Error al insertar tarea', 'Error');
            console.error("Error al guardar la tarea:", error);
          });
        } else {
          // Lógica para actualizar tarea existente
          const taskRef = doc(db, 'tareas', task.idunique);
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
            this.toastr.success('Operación exitosa', 'Exito');
            console.log("Tarea actualizada con ID:", task.idunique);
            console.log(task)
            const index = this.tasks.findIndex(t => t.idunique === task.idunique);
            if (index !== -1) {
              this.tasks[index] = task; // Actualizar tarea en la lista
            }
            this.displayDialog = false;
          })
          .catch((error) => {
            this.toastr.error('Error al actualizar tarea', 'Error');
            console.error("Error al actualizar la tarea:", error);
          });
        }
      },
      reject: () => {
        console.log('Guardado cancelado');
      },
    });
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
      creacion:  new Date(),
      vencimiento: new Date(),
      categoria: '',
      asignado: '',
      comentario: '',
      progreso: 0,
      idunique : ''
    };
  }

}
