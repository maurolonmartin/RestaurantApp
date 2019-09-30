import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ServiceService } from '../../shared/service.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private service: ServiceService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<ServiceComponent>) { }

  states = [
    { id: 'En preparacion', value: 'En preparacion'},
    { id: 'Para entrega', value: 'Para entrega'},
    { id: 'Entregado', value: 'Entregado'},
    { id: 'Orden cancelada', value: 'Orden cancelada'}
  ]

  ngOnInit() {
    this.service.getServices();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if (!this.service.form.get('$key').value) {
    this.service.insertService(this.service.form.value);
    }
    else{
      this.service.updateService(this.service.form.value);
    }
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success('Se ha guardado el registro');
    this.onClose();
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
