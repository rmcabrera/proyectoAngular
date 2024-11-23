import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './pages/task-dashboard/task-dashboard.component';

const routes: Routes = [
  { path: '', component: TaskDashboardComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
