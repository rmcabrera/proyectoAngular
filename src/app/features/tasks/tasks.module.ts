import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './tasks-routing.module';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { TaskDashboardComponent } from './pages/task-dashboard/task-dashboard.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { TaskService } from '../../core/services/task/task.service';

@NgModule({
  declarations: [
    TaskDashboardComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   
    TaskRoutingModule, 
    AuthRoutingModule,

    ButtonModule,  
    TableModule,  
    DialogModule,
    DropdownModule,
  ],

})
export class TaskModule {}
