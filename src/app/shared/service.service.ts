import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private firebase: AngularFireDatabase,
    private datePipe: DatePipe) { }

  serviceList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    serviceNumber: new FormControl('',Validators.required),
    restaurant: new FormControl(''),
    status: new FormControl('1'),
    date: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      serviceNumber: '',
      restaurant: '',
      status: '1',
      date: '',
    });
  }

  getServices(){
    this.serviceList = this.firebase.list('services');
    return this.serviceList.snapshotChanges();
  }

  insertService(service){
    this.serviceList.push({
      serviceNumber: service.serviceNumber,
      restaurant: service.restaurant,
      status: service.status,
      date: service.date == "" ? "" : this.datePipe.transform(service.date, 'EEEE dd h:MM a')
    });
  }

  updateService(service){
    this.serviceList.update(service.$key,{
      serviceNumber: service.serviceNumber,
      restaurant: service.restaurant,
      status: service.status,
      date: service.date == "" ? "" : this.datePipe.transform(service.date, 'EEEE dd h:MM a')
    });
  }

  deleteService($key: string){
    this.serviceList.remove($key);
  }
  
  populateForm(service){
    this.form.setValue(service)
  }
}
