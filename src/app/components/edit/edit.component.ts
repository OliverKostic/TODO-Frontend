import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { TodoService } from '../../todo.service';
import { Todo } from '../../todo.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  todo: any = {};
  updateForm: FormGroup;


  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {

    this.updateForm = this.fb.group({
      completed: [false],
      title: ['', Validators.required]

    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.todoService.getTodoById(this.id).subscribe(res => {
        this.todo = res;
        this.updateForm.get('title').setValue(this.todo.title);
        this.updateForm.get('completed').setValue(this.todo.completed);
      });
    });
  }

  updateTodo(title) {
    this.todo.title = title;
    this.todoService.updateTodo(this.todo).subscribe(() => {
      this.snackBar.open('To-Do updated successfully', 'OK', {
        duration: 3000
      });
      this.router.navigate(["list"]);
    });
  }

}
