import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthUser } from 'src/app/component/authentication/auth-store/auth.selectors';

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
      duration: [''],
      isImportant: [false]
    });

    this.newEvents.push(newEvent);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => {
        s.unsubscribe();
      })
    }
  }

}
