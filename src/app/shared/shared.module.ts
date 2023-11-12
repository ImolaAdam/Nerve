import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
  ],
  declarations: [
    TodoListComponent,
  ], 
  exports: [
    CommonModule,
    TodoListComponent,
    MatSliderModule,
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatListModule,
    MatGridListModule
  ]
})
export class SharedModule { }
