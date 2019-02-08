import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import {
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatExpansionModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDialogModule,
  MatTableModule, MatSortModule
} from '@angular/material';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CreatePatientComponent } from './patients/create-patient/create-patient.component';
import { PatientService } from './services/patient.service';
import { DisplayPatientComponent } from './patients/display-patients/display-patient.component';
import { CreatePatientCanDeactivateGuardService } from './patients/create-patient/create-patient-can-deactivate-guard.service';
import { PatientsDetailsComponent } from './patients/patient-details/patients-details.component';
import { NotFoundComponent } from './not-found.component';
import { PatientsDetailsCanActivateGuardService } from './patients/patient-details/patients-details-can-activate-guard.service';
import { PatientListResolverService } from './patients/patient-list-resolver.service';
import { EditDialogueComponent } from './patients/edit-dialog/edit-dialogue.component';
import { RiskService } from './services/risk.service';

const appRoutes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent,
    resolve: { patients: PatientListResolverService }
  },
  {
    path: 'create',
    component: CreatePatientComponent,
    canDeactivate: [CreatePatientCanDeactivateGuardService]
  },
  {
    path: 'patients/:patientid',
    component: PatientsDetailsComponent,
    canActivate: [PatientsDetailsCanActivateGuardService]
  },
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    CreatePatientComponent,
    DisplayPatientComponent,
    PatientsDetailsComponent,
    NotFoundComponent,
    EditDialogueComponent,
  ],
  entryComponents: [
    EditDialogueComponent,
    CreatePatientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    NgMatSearchBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    MatPaginatorModule
  ],
  providers: [PatientService,
    CreatePatientCanDeactivateGuardService,
    PatientsDetailsCanActivateGuardService,
    PatientListResolverService,
    RiskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
