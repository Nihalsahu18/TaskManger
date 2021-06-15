import { TaskService } from 'src/app/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import List from 'src/app/models/list';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  
  constructor(private taskservice:TaskService,
    private route: ActivatedRoute,
    private router: Router) { }
    list: List[]=[];
  ngOnInit(): void {
  }
  addList(listInput: string){
    this.taskservice.createList(listInput)
    .subscribe((list:any)=> this.router.navigate(['/lists',list._id]));
  }
}
