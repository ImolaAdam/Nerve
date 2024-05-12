import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { CalendarAddEventsComponent } from './calendar-add-events/calendar-add-events.component';
import { CalendarService } from '../../../services/calendar.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';
import { selectCalendarEvents } from '../../../dashboard-store/dashboard.selectors';

export type Colors = Record<string, EventColor>;

@Component({
  selector: 'app-dashboard-main-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-main-calendar.component.html',
  styleUrls: ['./dashboard-main-calendar.component.scss']
})
export class DashboardMainCalendarComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private authUserId: string = '';

  events: CalendarEvent[] = [];

  colors: Colors = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
  constructor(
    private modal: NgbModal,
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectAuthUser).subscribe((user) => {
        if (user?.userId) {
          this.authUserId = user.userId;
          this.calendarService.getCalendarEvents(this.authUserId);
        }
      })
    );

    this.subs.push(
      this.store.select(selectCalendarEvents).subscribe((events) => {
        if (events.length > 0) {
          let formattedEvents: CalendarEvent[] = [];
          events.forEach(e => {
            const event: CalendarEvent = {
              id: e.documentId,
              start: e.start,
              end: e.end,
              title: e.title,
              color: e.color,
              actions: this.actions,
              resizable: e.resizable,
              draggable: e.draggable,
            };

            formattedEvents.push(event);
          });
          this.events = formattedEvents;
          this.cdr.detectChanges();
        }
      })
    );

  }

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  @ViewChild('addEventModal', { static: true }) addEventModal!: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action == 'Deleted' && event.id && event.end) {
      const start = new Date(event.start);
      const end = new Date(event.end);

      // Calculate the duration in milliseconds
      const durationMs = Math.abs(start.getTime() - end.getTime());

      // Convert milliseconds to minutes
      const durationMinutes = durationMs / (1000 * 60);

      const docId = event.id.toString();
      this.calendarService.deleteCalendarEvent(docId, this.authUserId, durationMinutes);
    }
  }

  //Todo: add modal
  addEvent(): void {
    const dialogRef = this.dialog.open(CalendarAddEventsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    /*this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];*/
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy(): void {
    if (this.subs.length > 0) {
      this.subs.forEach(s => {
        s.unsubscribe();
      });
    }
  }

}
