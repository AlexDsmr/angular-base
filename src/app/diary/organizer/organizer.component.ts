import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService } from 'src/app/shared/date.service';
import { Task, TasksService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup;
  tasks: Task[] = []

  constructor(public dateService: DateService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

submit() {
  const {title} = this.form.value

  const task: Task = {
    title,
    date: this.dateService.date.value.format('DD-MM-YYYY')
  }
  
  this.tasksService.create(task).subscribe(task => {
    console.log('New task', task);
    this.form.reset()
  }, err => console.error(err))
}


}
