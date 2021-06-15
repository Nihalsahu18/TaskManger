import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import List from 'src/app/models/list';
import Task  from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  listId!: string;
  taskId!:string;
  _id!: string;
  
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
    
  ngOnInit():void {
    console.log(this.taskService);
    this.taskService.getLists().subscribe((lists :any) => this.lists = lists);
    this.taskService.getLists().subscribe((lists :any) => console.log(lists));
    this.route.params.subscribe(
      (params: Params)=>{
      console.log(params);
      this.listId= params.listId;
      console.log(params.listId);
      if(params.listId){
        this.listId= params.listId;
        this.taskService.getTasks(this.listId).subscribe((tasks:any)=>{
          this.tasks=tasks;
        })
      } else{
        console.log(Error);
        return
      }
    })
  }
  onTaskClick(task:Task){
    this.taskService.setCompleted(this.listId,task).subscribe(()=>task.completed=!task.completed)
  }
  deletetask(task:Task){
    /* console.log(task); */
    this.taskService.deleteTask(this.listId,task._id)
    .subscribe((task:any)=>this.tasks=this.tasks.filter(t=>t._id != task._id ))
  }
  deletelist(list:List){
    /* console.log(task); */
    this.taskService.deleteList(this.listId)
    .subscribe(()=>this.lists=this.lists.filter(l=>l._id != list._id ))
  }

  addTaskClick(){
    if(!this.listId){
      alert("please select a list to add task to");
      return;
    }else{
      this.router.navigate(['./new-task'],{relativeTo: this.route});
    }
  }

}

