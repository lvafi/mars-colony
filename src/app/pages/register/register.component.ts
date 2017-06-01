import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { RegisterService } from '../../services/register.service';

import {Colonist} from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService, ColonistService ]
})
export class RegisterComponent implements OnInit {
  public listJobs: Job[] = [];
  public colonist: Colonist; 
 
  constructor(private registerService: RegisterService,
              private ColonistService : ColonistService) { }

  ngOnInit() {
    this.registerService.getData()  
        .subscribe((jobs) => {
          this.listJobs = jobs;
        });
  }

  postColonist() {
    const colonist = new Colonist('Mak', '33', '1');
    this.ColonistService
        .postData(colonist)
        .subscribe((newColonist) => {
          console.log(newColonist);
        });
  } 
 

}

