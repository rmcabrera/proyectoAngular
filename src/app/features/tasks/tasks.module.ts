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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';    
import { ProgressBarModule } from 'primeng/progressbar';
import { TaskKanbanBoardComponent } from './pages/task-kanban-board/task-kanban-board.component'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; 


@NgModule({
  declarations: [
    TaskDashboardComponent,
    TaskFormComponent,
    TaskKanbanBoardComponent,

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
    CalendarModule,
    ConfirmDialogModule, 
    ToastModule,
    BadgeModule,
    ProgressBarModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
  exports : [
    TableModule,
    
  ],
  providers:[
   
  ]
})
export class TaskModule {}
