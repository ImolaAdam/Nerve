import { Component, Input, OnInit } from '@angular/core';

export type TodoList = { name: string; isCompleted: boolean; disappear: boolean};

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todoList: TodoList[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  onCompleteTask(task: TodoList):void {
    console.log(task)
  }

}
