import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { GoalService } from 'src/app/component/dashboard/services/goal.service';

export type TodoList = { name: string; isCompleted: boolean; disappear: boolean };

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() goalList: Goal[] = [];
  copiedGoals: Goal[] = [];

  constructor(
    private goalService: GoalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.copyGoals(); // Call a method to copy goals
  }
  
  copyGoals() {
    if (this.goalList.length > 0) {
      this.copiedGoals = [...this.goalList]; // Copy the array using the spread operator
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.goalList && changes.goalList.currentValue) {
      this.copyGoals();
    }
  }

  // If the task is disappearable we remove it from the list
  onCompleteTask(goal: Goal): void {
    // 700 milliseconds delay before emitting to parent (for the checkbox animation -> isCompleted) 
    setTimeout(() => {
      this.goalService.onUpdateGoal(goal.id, !goal.isCompleted);
      this.cdr.detectChanges();
      //this.updateGoals.emit({ updateGoalList: task, listType: this.listType });
    }, 700);
  }

}
