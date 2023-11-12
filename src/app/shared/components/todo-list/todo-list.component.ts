import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type TodoList = { name: string; isCompleted: boolean; disappear: boolean }; //id: string ,rename name

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todoList: TodoList[] = [];
  @Input() listType: string = '';
  @Output() filteredTodoList = new EventEmitter<{ completedTask: TodoList, listType: string }>();

  constructor() { }

  ngOnInit() { }

  // If the task is disappearable we remove it from the list
  onCompleteTask(task: TodoList): void {
    // 700 milliseconds delay before emitting to parent (for the checkbox animation) 
    setTimeout(() => {
      this.filteredTodoList.emit({ completedTask: task, listType: this.listType });
    }, 700);
  }

}
