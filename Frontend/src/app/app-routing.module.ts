import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Params } from '@angular/router';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';

const routes: Routes = [
  {path:'',redirectTo:'lists',pathMatch:'full'},
  {path:'lists',component: TaskViewComponent},
  {path:'lists/:listId',component: TaskViewComponent},
  {path:'lists/:listId/new-task',component: NewTaskComponent},
  {path:'new-list',component: NewListComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
