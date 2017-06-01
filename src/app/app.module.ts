import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { EncountersComponent } from './pages/encounters/encounters.component';
import { RegisterComponent } from './pages/register/register.component';


const appRoutes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'encounters', component: EncountersComponent},
  {path: 'report', component: ReportComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    EncountersComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
