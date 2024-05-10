import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { CreateCalendarEventDto } from 'src/app/shared/dto/CreateCalendarEventDto';

@Component({
  selector: 'app-calendar-add-events',
  templateUrl: './calendar-add-events.component.html',
  styleUrls: ['./calendar-add-events.component.scss']
})
export class CalendarAddEventsComponent implements OnInit, OnDestroy {
  eventForm = this.fb.group({
    items: this.fb.array([])
  });
  techniqueForm: FormGroup;

  private authUserId: string = '';
  private subscriptions: Subscription[] = [];
  technique: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store

  ) {
    this.eventForm = this.fb.group({
      items: this.fb.array([])
    });

    this.techniqueForm = this.fb.group({
      Pomodoro: [false], // Initialize form control values
      Ratio: [false],
      None: [false]
    });
  }

  ngOnInit() {

    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user?.userId) {
          this.authUserId = user.userId;
        }
      })
    )
  }

  get newEvents() {
    return this.eventForm.get('items') as FormArray;
  }

  onDeleteFormItem(index: number) {
    this.newEvents.removeAt(index);
  }

  setTechnique(technique: string, checked: boolean) {
    if (checked) {
      this.technique = technique;
      // If a checkbox is checked, uncheck the others
      Object.keys(this.techniqueForm.controls).forEach(key => {
        const control = this.techniqueForm.get(key);
        if (control) {
          if (key !== technique) {
            control.setValue(false);
          }
        }
      });
    }
  }

  onAddItem() {
    const newEvent = this.fb.group({
      name: [''],
      startDate: [''],
      startTime: [''],
      duration: [''],
      isImportant: [false]
    });

    this.newEvents.push(newEvent);
  }

  onGenerateEvents(events: FormArray) {
    switch (this.technique) {
      case 'Pomodoro':
        // rank -> duration
        console.log(this.technique, events.value)
        break;
      case 'Ratio':
        // rank -> duration
        console.log(this.technique, events.value)
        break;
      case 'None':
        // create calendar event for the packege
        // start date for every event + duration
        this.createBasicCalendarEvents(events.value);
        break;
    }
  }

  // None option
  createBasicCalendarEvents(events: any) {
    let newCalendarEvents: CreateCalendarEventDto[] = [];
    if (events) {
      events.forEach((e: any) => {
        const formattedStartDate = new Date(e.startDate);

        // Assuming startTime is a string in "HH:mm" format
        const startTimeString = e.startTime; // Extract startTime as string
        const [hours, minutes] = startTimeString.split(':').map(Number);

        formattedStartDate.setHours(hours);
        formattedStartDate.setMinutes(minutes);

        const durationInMinutes = e.duration;

        // Set the end date by adding the duration to the start date's minutes
        const formattedEndDate = new Date(formattedStartDate.getTime() + durationInMinutes * 60000);

        const newEvent: CreateCalendarEventDto = {
          name: e.name,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          userId: this.authUserId,
          type: 'None'
        };

        newCalendarEvents.push(newEvent);
      });

    }
  }

  combineDate(date: Date, time: any): Date {
    const startDate = date;
    const startTime = time;

    // Extract year, month, and day from startDate
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    // Extract hours and minutes from startTime
    const [hours, minutes] = startTime.split(':').map(Number);

    // Create a new Date object with combined date and time
    const combinedDate = new Date(year, month, day, hours, minutes);

    return combinedDate;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => {
        s.unsubscribe();
      })
    }
  }

}
