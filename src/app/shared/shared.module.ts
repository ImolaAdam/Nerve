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
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatChipsModule
  ],
  declarations: [
    TodoListComponent,
    GoalListComponent,
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
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    NgbModule,
    GoalListComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ]
})
export class SharedModule { }
