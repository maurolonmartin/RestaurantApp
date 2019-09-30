import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private firebase: AngularFireDatabase) { }

  serviceList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    serviceNumber: new FormControl(''),
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
      date: ''
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
      date: service.date
    });
  }

  updateService(service){
    this.serviceList.update(service.$key,{
      serviceNumber: service.serviceNumber,
      restaurant: service.restaurant,
      status: service.status,
      date: service.date
    });
  }

  deleteService($key: string){
    this.serviceList.remove($key);
  }
  
  populateForm(service){
    this.form.setValue(service)
  }
}
