import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from '../todo-list/todo-list.component';

@Component({
  selector: 'shared-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit {
  @Input() goalList: TodoList[] = [];

  constructor() { }

  ngOnInit() {
  }

}
