import { Component, OnInit } from '@angular/core';
import { Alien} from '../../models/alien';
import { AlienService } from '../../services/alien.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
    return (control: AbstractControl) => {
      return control.value === value ? { 'Can\'t be this value': value} : null;
    };
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AlienService, ReportService]
})
export class ReportComponent implements OnInit {
  public listAliens: Alien[] = [];
  public report: Report;
  public reportForm: FormGroup;
  private NO_SELECTION = 'default';
  private repAtype: string;
  private repAct: string;

  constructor(private alienService: AlienService,
              private reportService: ReportService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  this.reportService.getData()
               .subscribe((aliens)=>{
                 this.listAliens = aliens;
               }); 
  this.reportForm = new FormGroup({
    repAtype: new FormControl(this.NO_SELECTION, [
        Validators.required,
        cantBe(this.NO_SELECTION)
        ]),
    repAct: new FormControl('', [Validators.required])
    });   
}

postReport(e) {
  e.preventDefault();
  const alien = this.reportForm.get('repAtype').value;
  const action = this.reportForm.get('repAct').value;
  const day = new Date;
  const dateString = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

  const colonist_id = localStorage.getItem('colonistIdNum');
  const report = new Report(alien,dateString, action, colonist_id); 
  
  this.reportService
      .postData(report)
      .subscribe((newReport) => {
        console.log('Ur Report Has been Submitted');
        this.router.navigate (['/encounters']);
        });
  }

}

