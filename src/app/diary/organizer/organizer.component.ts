import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/shared/date.service';
import { Task, TasksService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup;

  constructor(public dateService: DateService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
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
    this.form.reset()
  }, err => console.error(err))

}

}
