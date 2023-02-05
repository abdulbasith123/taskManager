import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {


  listId: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: any) => this.listId = params.listId)
  }

  ngOnInit(): void {
  }

  addTask(value: any) {
    this.taskService.createTask(this.listId, value)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }))
  }
}
