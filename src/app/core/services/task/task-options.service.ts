import { Injectable } from '@angular/core';
import { PriorityOption } from '../../models/priority-option.model';
import { StatusOption } from '../../models/status-option.model';
import { CategoryOption } from '../../models/category-option.model';

@Injectable({
  providedIn: 'root' 
})
export class TaskOptionsService {

  priorityOptions: PriorityOption[] = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' }
  ];

  statusOptions : StatusOption[] = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En progreso', value: 'En progreso' },
    { label: 'Completada', value: 'Completada' }
  ];

  categoriaOptions: CategoryOption[]  = [
    { label: 'Personales', value: 'Personales' },
    { label: 'Laborales', value: 'Laborales' },
    { label: 'Fiscalización', value: 'Fiscalización' },
    { label: 'Auditoría', value: 'Auditoría' },
    { label: 'Administrativa', value: 'Administrativa' },
    { label: 'Gestión de tributos', value: 'Gestión de tributos' },
    { label: 'Otros', value: 'Otros' }
  ];

  constructor() { }

  getPriorityOptions(): PriorityOption[] {
    return this.priorityOptions;
  }

  getStatusOptions(): StatusOption[] {
    return this.statusOptions;
  }

  getCategoriaOptions(): CategoryOption[] {
    return this.categoriaOptions;
  }
}
