import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../models/patient.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { PageEvent } from '@angular/material';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  isLoading = true;
  title = "Patients";
  patients: Patient[];
  filteredPatients: Patient[];
  error: any;

  private _searchID: string;
  private startIndex: number;
  private endIndex: number;
  private pageSize: number = 25;
  private pageNumber: number;
  
  canPageDown: boolean;
  canPageUp: boolean;
  pageEvent: PageEvent;

  get searchID(): string {
    return this._searchID;
  }

  set searchID(sid: string) {
    if (sid === "") {
      this.filteredPatients = this.getPagedPatients(this.patients);
    } else {
      console.log("Filtering search");
      this._searchID = sid;
      this.filteredPatients = this.filterPatients();
    }
  }

  constructor(private _activatedRoute: ActivatedRoute, 
    private _router: Router, 
    private _patientService: PatientService) {
    const resolvedData: Patient[] | string = this._activatedRoute.snapshot.data['patients'];
    if(Array.isArray(resolvedData)) {
      this.patients = resolvedData;
      this.filteredPatients = this.getPagedPatients(this.patients);
    } else {
      console.log("Caught an error");
      this.error = resolvedData;
    }
    //subscribe to nav events in browser
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    if(!this.error){
      this.startIndex = 0;
      this.endIndex = (this.patients.length > 25) ? 25 : this.patients.length;
      this.canPageDown = this.startIndex > 0;
      this.canPageUp = this.endIndex < this.patients.length;
      this.pageNumber = 0;
    }
  }

  filterPatients(): Patient[] {

    let id = +this._searchID;
    let result: Patient[] = [];
    if (this.patients.find(p => p.id === id)) {
      result.push(this.patients.find(p => p.id === id));
    }
    return result;
  }

  getPagedPatients(patients: Patient[]): Patient[] {
    const data = patients;
    const itemsToSlice = (this.endIndex < data.length) ? true : false;
    if(itemsToSlice){
      return data.slice(this.startIndex, this.pageSize + this.startIndex);
    } else {
      return data.slice(this.startIndex);
    }    
  }

  pageUp() {
    if (this.canPageUp) {
      this.pageNumber++;
      this.startIndex = this.pageNumber * this.pageSize;
      this.endIndex = (this.patients.length <= (this.pageNumber + 1) * this.pageSize) ?
        this.patients.length : (this.pageNumber + 1) * this.pageSize;
      this.filteredPatients = this.getPagedPatients(this.patients);
      this.canPageUp = this.endIndex < this.patients.length;
      this.canPageDown = this.startIndex > 0;
    }
  }

  pageDown() {
    if (this.canPageDown) {
      this.pageNumber--;
      this.startIndex = this.pageNumber * this.pageSize;
      this.endIndex = (this.pageNumber + 1) * this.pageSize;
      this.filteredPatients = this.getPagedPatients(this.patients);
      this.canPageUp = this.endIndex < this.patients.length;
      this.canPageDown = this.startIndex > 0;
    }
  }
  
  onDeleteNotified(){
    console.log("Delete notified");
    this._patientService.getPatients().subscribe((pats: Patient[]) => {
      this.filteredPatients = this.getPagedPatients(pats);
    })
    
  }
}
