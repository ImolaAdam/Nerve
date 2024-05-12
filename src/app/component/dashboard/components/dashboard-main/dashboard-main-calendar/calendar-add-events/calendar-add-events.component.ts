import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { CalendarService } from 'src/app/component/dashboard/services/calendar.service';
import { CreateCalendarEventDto } from 'src/app/shared/dto/CreateCalendarEventDto';
import * as DashboardActions from '../../../../dashboard-store/dashboard.actions';
import { selectCalendarEvents } from 'src/app/component/dashboard/dashboard-store/dashboard.selectors';

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
  technique: string = 'Pomodoro';
  generateStartDate = new Date();
  generatetartTime!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef
  ) {
    this.eventForm = this.fb.group({
      items: this.fb.array([])
    });

    this.techniqueForm = this.fb.group({
      Pomodoro: [true],
      Ratio: [false],
      Custom: [false]
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user?.userId) {
          this.authUserId = user.userId;
          console.log(this.authUserId)
        }
      })
    );

    // Todo: finish
    this.subscriptions.push(
      this.store.select(selectCalendarEvents).subscribe((event) => {

      })
    );
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
        this.createRatioCalendarEvents(events.value);
        break;
      case 'Ratio':
        this.createRatioCalendarEvents(events.value);
        break;
      case 'Custom':
        this.createBasicCalendarEvents(events.value);
        break;
    }
  }

  // 25-minute focused study sessions followed by a 5-minute break
  createPomodoroCalendarEvents(events: any) {
    if (events.length > 0) {
      let startDate = this.calculateStartDate(this.generateStartDate, this.generatetartTime);
      let newCalendarEvents: CreateCalendarEventDto[] = [];
      let summaryOfMinutes = 0;

      events.forEach((e: any) => {
        const fullSessions: number = Math.floor(e.duration / 25); // Full 25-minute work sessions
        const remainingMinutes: number = e.duration % 25; // Remaining minutes after full sessions
        const totalSessions = remainingMinutes > 0 ? fullSessions + 1 : fullSessions;
        const totalBreaks = totalSessions - 1; // One less break than work session

        const workMinutes = fullSessions * 25 + (remainingMinutes >= 10 ? 25 : remainingMinutes);
        const breakMinutes = totalBreaks * 5;

        console.log(totalSessions)

        summaryOfMinutes += workMinutes + breakMinutes;

        for (let i = 0; i < totalSessions; i++) {
          // Create new work session event
          const workStartDate = new Date(startDate);
          const workEndDate = new Date(workStartDate.getTime() + 25 * 60000);
          const workEvent: CreateCalendarEventDto = {
            name: e.name,
            startDate: workStartDate,
            endDate: workEndDate,
            userId: this.authUserId,
            type: 'Pomodoro'
          };
          newCalendarEvents.push(workEvent);

          // Create new break session event
          const breakStartDate = new Date(workEndDate);
          const breakEndDate = new Date(breakStartDate.getTime() + 5 * 60000);
          const breakEvent: CreateCalendarEventDto = {
            name: 'Break',
            startDate: breakStartDate,
            endDate: breakEndDate,
            userId: this.authUserId,
            type: 'Pomodoro'
          };
          newCalendarEvents.push(breakEvent);

          // Update startDate for the next session
          startDate = new Date(breakEndDate.getTime() + 25 * 60000); // Move start date to after the next work session
        }
      });

      if (newCalendarEvents.length != 0) {
        this.calendarService.createNewEvents(newCalendarEvents, summaryOfMinutes);
        this.cdr.detectChanges();
      }
    }
  }

  //52 minutes of focused work followed by a generous 17-minute
  createRatioCalendarEvents(events: any) {
    if (events && events.length > 0) {
      if (events.length > 0) {
        let startDate = this.calculateStartDate(this.generateStartDate, this.generatetartTime);
        let newCalendarEvents: CreateCalendarEventDto[] = [];
        let summaryOfMinutes = 0;

        events.forEach((e: any) => {
          const fullSessions: number = Math.floor(e.duration / 52); // Full 52-minute work sessions
          const remainingMinutes: number = e.duration % 52; // Remaining minutes after full sessions
          const totalSessions = remainingMinutes > 0 ? fullSessions + 1 : fullSessions;
          const totalBreaks = totalSessions - 1; // One less break than work session

          const workMinutes = fullSessions * 52 + remainingMinutes;
          const breakMinutes = totalBreaks * 17;

          summaryOfMinutes += workMinutes + breakMinutes;

          for (let i = 0; i < totalSessions; i++) {
            // Create new work session event
            const workStartDate = new Date(startDate);
            const workEndDate = new Date(workStartDate.getTime() + 52 * 60000);
            const workEvent: CreateCalendarEventDto = {
              name: e.name,
              startDate: workStartDate,
              endDate: workEndDate,
              userId: this.authUserId,
              type: 'Pomodoro'
            };
            newCalendarEvents.push(workEvent);

            // Create new break session event
            const breakStartDate = new Date(workEndDate);
            const breakEndDate = new Date(breakStartDate.getTime() + 17 * 60000);
            const breakEvent: CreateCalendarEventDto = {
              name: 'Break',
              startDate: breakStartDate,
              endDate: breakEndDate,
              userId: this.authUserId,
              type: 'Pomodoro'
            };
            newCalendarEvents.push(breakEvent);

            // Update startDate for the next session
            startDate = new Date(breakEndDate.getTime());
          }
        });

        if (newCalendarEvents.length != 0) {
          this.calendarService.createNewEvents(newCalendarEvents, summaryOfMinutes);
          this.cdr.detectChanges();
        }
      }
    }
  }



  // Creating date from date + hour:minute
  calculateStartDate(generateStartDate: Date, generatetartTime: number): Date {
    const formattedStartDate = new Date(this.generateStartDate);

    const startTimeString = this.generatetartTime.toString();
    const [hours, minutes] = startTimeString.split(':').map(Number);

    formattedStartDate.setHours(hours);
    formattedStartDate.setMinutes(minutes);
    return formattedStartDate;
  }

  // Custom option
  createBasicCalendarEvents(events: any) {
    let newCalendarEvents: CreateCalendarEventDto[] = [];
    let summaryOfMinutes = 0;
    if (events) {
      events.forEach((e: any) => {
        const formattedStartDate = new Date(e.startDate);

        // Assuming startTime is a string in "HH:mm" format
        const startTimeString = e.startTime; // Extract startTime as string
        const [hours, minutes] = startTimeString.split(':').map(Number);

        formattedStartDate.setHours(hours);
        formattedStartDate.setMinutes(minutes);

        const durationInMinutes = e.duration;

        // Clone the start date to avoid modifying it directly
        const formattedEndDate = new Date(formattedStartDate.getTime());

        // Increment hours and minutes separately
        formattedEndDate.setHours(formattedEndDate.getHours() + Math.floor(durationInMinutes / 60));
        formattedEndDate.setMinutes(formattedEndDate.getMinutes() + (durationInMinutes % 60));

        // Check if the end time exceeds 24 hours
        if (formattedEndDate.getHours() >= 24) {
          // Adjust the date accordingly
          formattedEndDate.setDate(formattedEndDate.getDate() + 1);
          formattedEndDate.setHours(formattedEndDate.getHours() - 24);
        }

        const newEvent: CreateCalendarEventDto = {
          name: e.name,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          userId: this.authUserId,
          type: 'Custom'
        };

        newCalendarEvents.push(newEvent);
        summaryOfMinutes += e.duration;
      });


    }
    if (newCalendarEvents.length != 0) {
      this.calendarService.createNewEvents(newCalendarEvents, summaryOfMinutes);
      this.cdr.detectChanges();
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
