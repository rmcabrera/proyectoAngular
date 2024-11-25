import { Timestamp } from "firebase/firestore";

export interface Task {
    id: number;                     
    titulo: string;                  
    descripcion: string;           
    prioridad: 'Alta' | 'Media' | 'Baja'; 
    estado: 'Pendiente' | 'En progreso' | 'Completada'; 
    creacion: Date;             
    vencimiento: Date;                  
    categoria: string;    
    asignado : string;
    comentario : string;      
    progreso : number; 
    idunique : string;      //no esta bd   
  }
  