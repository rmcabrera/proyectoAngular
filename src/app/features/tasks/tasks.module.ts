import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './tasks-routing.module';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { TaskDashboardComponent } from './pages/task-dashboard/task-dashboard.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SharedsModule } from '../../shared/shareds.module';

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
    ToolbarModule,
    SharedsModule
  ],
  exports : [
    TableModule
  ]
})
export class TaskModule {}
