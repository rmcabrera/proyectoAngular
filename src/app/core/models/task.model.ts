import { Timestamp } from "firebase/firestore";

export interface Task {
    id?: string;                     
    titulo: string;                  
    descripcion: string;           
    prioridad: string; 
    estado: string; 
    creacion: Date;             
    vencimiento: Date;                  
    categoria: string ; 
    asignado : string;
    comentario : string;      
    progreso : number; 
    idusuario : string;
  }
  