import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
  ],
  declarations: [
    TodoListComponent,
  ], 
  exports: [
    CommonModule,
    TodoListComponent,
    MatSliderModule,
  ]
})
export class SharedModule { }
