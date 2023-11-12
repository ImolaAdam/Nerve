import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/shared/components/todo-list/todo-list.component';

@Component({
  selector: 'app-dashboard-main-cards',
  templateUrl: './dashboard-main-cards.component.html',
  styleUrls: ['./dashboard-main-cards.component.scss']
})
export class DashboardMainCardsComponent implements OnInit {
  dailyTodoList: TodoList[] = [
    { name: 'Do homework', isCompleted: false, disappear: true },
    { name: 'Buy present', isCompleted: false, disappear: true },
    { name: 'Relax, u dont have to kill yourself', isCompleted: false, disappear: true },
    { name: 'Mephi food', isCompleted: false, disappear: true },
    { name: 'Another one', isCompleted: false, disappear: true },
    { name: 'Again', isCompleted: false, disappear: true },
    { name: 'Do homework', isCompleted: false, disappear: true },
    { name: 'Do homework', isCompleted: false, disappear: true },
  ];

  weeklyTodoList: TodoList[] = [
    { name: 'Do homework', isCompleted: false, disappear: false },
    { name: 'Buy present', isCompleted: false, disappear: false },
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: false },
    { name: 'Mephi food', isCompleted: false, disappear: false },
    { name: 'Another one', isCompleted: false, disappear: false },
  ];

  monthlyTodoList: TodoList[] = [
    { name: 'Visit Makó', isCompleted: false, disappear: false },
    { name: 'Paint room', isCompleted: false, disappear: false },
    { name: 'Relax, u dont have to kill yourself', isCompleted: true, disappear: false },
    { name: 'Order Mephi food <3', isCompleted: false, disappear: false },
  ];

  yearlyTodoList: TodoList[] = [
    { name: 'Loose 10kg', isCompleted: false, disappear: false },
    { name: 'Buy a guitar', isCompleted: false, disappear: false },
    { name: 'Go to the Netherlands', isCompleted: false, disappear: false },
  ];

  onUpdateToDoList(completedTask: TodoList, listType: string) {
    let fileteredTaskList: TodoList[] = [];
    switch (listType) {
      case 'daily':
        fileteredTaskList = this.dailyTodoList.filter( t => t.name !== completedTask.name );
        this.dailyTodoList = fileteredTaskList;
        break;
      case 'weekly':
        fileteredTaskList = this.weeklyTodoList.filter( t => t.name !== completedTask.name );
        this.weeklyTodoList = fileteredTaskList;
        break;
      case 'monthly':
        console.log('monthly')
        break;
      case 'yearly':
        console.log('yearly')
        break;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
