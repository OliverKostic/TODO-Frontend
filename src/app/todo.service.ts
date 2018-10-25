import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  uri = 'https://todoexercise-backend.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  getTodos() {
    return this.http.get(`${this.uri}/todo`);
  }

  getTodoById(id) {
    return this.http.get(`${this.uri}/todo/${id}`);
  }

  addTodo(title) {
    const todo = {
      completed: false,
      title: title
    };
    return this.http.post(`${this.uri}/todo/add`, todo);
  }

  updateTodo(element) {
    const todo = {
      _id: element._id,
      completed: element.completed,
      title: element.title
    };
    console.log(JSON.stringify(todo))
    return this.http.post(`${this.uri}/todo/update/${element._id}`, todo);
  }

  deleteTodo(element) {
    return this.http.get(`${this.uri}/todo/delete/${element._id}`)
  }
}
