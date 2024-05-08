import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSliderModule } from "@angular/material/slider";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports: [
        MatSliderModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatGridListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatDialogModule
    ],
    exports: [
        MatSliderModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatGridListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatDialogModule
    ]
})
export class MaterialModule { }