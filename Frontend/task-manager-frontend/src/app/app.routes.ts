import { Routes } from '@angular/router';
import { Tasks } from './pages/tasks/tasks';
import { Users } from './pages/users/users';

export const routes: Routes = [
  { path: '', component: Tasks },
  { path: 'users', component: Users },
];
