import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DashboardActions from './dashboard.actions'
import { exhaustMap, first, of } from 'rxjs';


@Injectable()
export class DashboardEffects {

    constructor(private store: Store, private actions$: Actions,) { }

    setMenuName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActions.setDashboardMenu),
            exhaustMap(({ menuName }) =>
                this.store.pipe(
                    first(),
                    exhaustMap((menuName) => {
                        return of(DashboardActions.dashboardMenuSet());
                    })
                )
            )
        )
    );

}