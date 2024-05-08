import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calendar-add-events',
  templateUrl: './calendar-add-events.component.html',
  styleUrls: ['./calendar-add-events.component.scss']
})
export class CalendarAddEventsComponent implements OnInit {
  eventForm = this.fb.group({
    items: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder

  ) {
    this.eventForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit() {
  }

  get newEvents() {
    return this.eventForm.get('items') as FormArray;
  }

  onDeleteFormItem(index: number) {
    this.newEvents.removeAt(index);
  }

onAddItem() {
  const newEvent = this.fb.group({
    description: 'hii'
  });

  this.newEvents.push(newEvent);
}

}
