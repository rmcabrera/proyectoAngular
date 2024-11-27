import { Timestamp } from "firebase/firestore";

export interface Task {
    id?: string;                     
    titulo: string;                  
    descripcion: string;           
    prioridad: 'Alta' | 'Media' | 'Baja'; 
    estado: 'Pendiente' | 'En progreso' | 'Completada'; 
    creacion: Date;             
    vencimiento: Date;                  
    categoria: 'Personales' | 'Laborales' | 'Fiscalización' | 'Auditoría' | 'Administrativa' | 'Gestión de tributos' | 'Otros';   
    asignado : string;
    comentario : string;      
    progreso : number; 
  }
  