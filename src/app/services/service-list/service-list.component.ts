import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ServiceComponent } from "../service/service.component";
import { NotificationService } from "src/app/shared/notification.service";


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  constructor(private service: ServiceService,
              private dialog: MatDialog,
              private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['serviceNumber', 'restaurant', 'status', 'date', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
  searchKey: string;


  ngOnInit() {
    this.service.getServices().subscribe(
      list => {
        let array = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };

        });
        
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ServiceComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ServiceComponent, dialogConfig);
  }

  onDelete($key){
    if(confirm('Esta a punto de eliminar el registro, ¿Está seguro?')){
      this.service.deleteService($key);
      this.notificationService.warn('Borrado completado');
    }
  }
}
