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
import { SharedsModule } from '../../shared/shareds.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea'; 
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    TaskDashboardComponent,
    TaskFormComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule, 
    ButtonModule,  
    TableModule,  
    DialogModule,
    DropdownModule,
    ToolbarModule,
    SharedsModule,
    SliderModule,
    InputTextModule,
    AvatarModule,
    InputTextareaModule,
    CalendarModule
  ],
  exports : [
    TableModule
  ]
})
export class TaskModule {}
