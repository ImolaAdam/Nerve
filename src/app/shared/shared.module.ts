import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    TodoListComponent,
    GoalListComponent,
  ], 
  exports: [
    CommonModule,
    TodoListComponent,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    GoalListComponent,
    PdfViewerModule,
    CalendarModule,
    FlatpickrModule,
  ]
})
export class SharedModule { }
