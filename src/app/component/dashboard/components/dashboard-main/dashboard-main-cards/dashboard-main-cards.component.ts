import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from 'src/app/shared/components/todo-list/todo-list.component';

@Component({
  selector: 'app-dashboard-main-cards',
  templateUrl: './dashboard-main-cards.component.html',
  styleUrls: ['./dashboard-main-cards.component.scss']
})
export class DashboardMainCardsComponent implements OnInit {

  @Input() dailyTodoList: TodoList[] = [];
  @Input() weeklyTodoList: TodoList[] = [];
  @Input() monthlyTodoList: TodoList[] = [];
  @Input() yearlyTodoList: TodoList[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
