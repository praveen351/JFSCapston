import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { HomeComponentComponent } from './home-component/home-component.component';
import { MaterialModule } from './materialmodule/material-module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    CandidateModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
