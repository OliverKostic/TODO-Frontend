import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatCheckboxModule, MatTableDataSource } from '@angular/material';

import { Todo} from "../../todo.model";
import { TodoService } from '../../todo.service';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos: Todo[];
  displayedColumns = ['checkbox', 'title', 'actions'];


  constructor(private todoService: TodoService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService
      .getTodos()
      .subscribe((data: Todo[]) => {
        this.todos = data;
        console.log('Data requested ...');
        console.log(this.todos);
      });
  }

updateCompleted(element, event) {
  element.completed = event.checked;
  this.todoService.updateTodo(element).subscribe(res => {
    console.log(res);
  }, err => {
    console.log("err;" + err);
  })

}


  editTodo(element) {
    this.router.navigate([`/edit/${element._id}`]);
  }

  deleteTodo(element): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(element).subscribe(() => {
          this.fetchTodos();
        });
      }
    });
  }
}
