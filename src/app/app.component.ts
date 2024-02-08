import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {RequestMiddlewareService} from "./services/request-middleware.service";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {MedianServiceCallType} from "./services/request-middleware.service.type";

@Component({
  selector: 'nrx-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  providers: [

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ng-rxjs-pipes';


  constructor(private medianService: RequestMiddlewareService) {
  }
  ngOnInit(){

    // this.medianService.wrapperCall(MedianServiceCallType.GET_SAMPLE).subscribe((res)=>{
    //   console.log(res);
    // })

    const callType = MedianServiceCallType.ERROR_400;
    this.medianService.wrapperCall(callType).subscribe({
      next: (res)=>{

        console.log('next res caught  - ', res);
      },
      error: (err)=>{
        console.log('err caught - ', err, '|');
      },
      complete: () => {
        console.log('complete');
      }
    })


  }
}
