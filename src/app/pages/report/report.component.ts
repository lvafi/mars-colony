import { Component, OnInit } from '@angular/core';
import { Alien} from '../../models/alien';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {
  public listAlien: Alien[] = [];
  constructor(private reportService: ReportService) { }

  ngOnInit() {
  this.reportService.getData()
               .subscribe((aliens)=>{
                 this.listAlien = aliens;
               });    
}

postReport() {
  const report = { 
    atype: 'octospider',
    date: '2015-10-01',
    action: 'web dev',
    colonist_id : '4'
  }
  this.reportService.postData(report)
                .subscribe((newReport) => {
                  console.log(newReport);
                });
}

}

