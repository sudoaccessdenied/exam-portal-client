import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule } from '@angular/material/form-field';
import{ MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule} from '@angular/material/button'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
// import { FormBuilder ,FormGroup, FormControl} from '@angular/forms';

// Reactive forms module

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationModule } from '../registration/registration.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatProgressSpinnerModule,
    MatDialogModule
    
    // FormBuilder,
    // FormControl,
    // FormGroup
  ],
  exports :[
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatProgressSpinnerModule,
    MatDialogModule
    // FormBuilder,
    // FormControl,
    // FormGroup
  ]
})
export class SharedModule { }
