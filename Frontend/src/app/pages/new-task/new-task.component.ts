import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import List from 'src/app/models/list';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  list: List[]=[];
  listId!: string;
  constructor(private taskservice:TaskService,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe((params:Params)=> this.listId=params.listId);
     }
    
  ngOnInit(): void {
  }
  addtask(taskInput: string){
    this.taskservice.createTask(this.listId,taskInput)
    .subscribe(()=>this.router.navigate(['../'],{relativeTo: this.route}))
  }
}
