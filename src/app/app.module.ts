import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './services/service/service.component';
import { ServiceService } from './shared/service.service';
import { environment } from '../environments/environment';
import { ServiceListComponent } from './services/service-list/service-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ServiceComponent,
    ServiceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent],
  entryComponents: [ServiceComponent]
})
export class AppModule { }
