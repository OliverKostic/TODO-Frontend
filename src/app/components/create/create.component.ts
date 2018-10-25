import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../todo.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private todoService: TodoService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      completed: [false],
      title: ['', Validators.required]
    })
  }

  addTodo(title) {
    this.todoService.addTodo(title).subscribe(() => {
      this.router.navigate(['/list']);
    })
  }

  ngOnInit() {
  }

}
