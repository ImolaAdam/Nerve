import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/shared/components/todo-list/todo-list.component';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  dailyTodoList: TodoList[] = [
    { name: 'Do homework', isActive: true},
    { name: 'Buy present', isActive: true},
    { name: 'Relax, u dont have to kill yourself', isActive: true},
    { name: 'Mephi food', isActive: true},
    { name: 'Another one', isActive: true},
    { name: 'Again', isActive: true},
    { name: 'Do homework', isActive: true},
    { name: 'Do homework', isActive: true},
  ];

  weeklyTodoList: TodoList[] = [
    { name: 'Do homework', isActive: true},
    { name: 'Buy present', isActive: true},
    { name: 'Relax, u dont have to kill yourself', isActive: true},
    { name: 'Mephi food', isActive: true},
    { name: 'Another one', isActive: true},
  ];

  monthlyTodoList: TodoList[] = [
    { name: 'Visit Makó', isActive: true},
    { name: 'Paint room', isActive: true},
    { name: 'Relax, u dont have to kill yourself', isActive: true},
    { name: 'Order Mephi food <3', isActive: true},
  ];

  yearlyTodoList: TodoList[] = [
    { name: 'Loose 10kg', isActive: true},
    { name: 'Buy a guitar', isActive: true},
    { name: 'Go to the Netherlands', isActive: true},
  ];

  constructor() { }

  ngOnInit() {
  }

}
