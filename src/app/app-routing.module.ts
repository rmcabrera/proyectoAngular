import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found/page-not-found.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { 
    path: 'login', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'main',
    component: MainLayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'tasks', 
        loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TaskModule),
        canActivate: [AuthGuard]
      },
      { path: '', component: WelcomeComponent, pathMatch: 'full' }, 
      { path: '**', component: PageNotFoundComponent }, 
    ],
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
