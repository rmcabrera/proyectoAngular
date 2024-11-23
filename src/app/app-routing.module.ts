import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { 
    path: 'login', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) 
  },  
  { 
    path: 'tasks', 
    loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TaskModule), 
    canActivate: [AuthGuard] 
  }, 
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
}) 
export class AppRoutingModule {}
