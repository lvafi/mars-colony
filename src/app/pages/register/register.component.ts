import { Component, OnInit } from '@angular/core';
import { ColonistService } from '../../services/colonist.service';
import {Colonist} from '../../models/colonist';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ColonistService ]
})
export class RegisterComponent implements OnInit {
  
 
  colonist: Colonist;
  constructor(private ColonistService : ColonistService) { }

  ngOnInit() {}

  postColonist() {
    const colonist = new Colonist('Mak', '33', '1');
    this.ColonistService.postData(colonist)
                        .subscribe((newColonist) => {
                          console.log(newColonist);
                        });
  } 
 

}

