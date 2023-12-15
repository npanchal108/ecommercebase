import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformServer } from '@angular/common';
import { request,  response  } from 'express';
@Component({
  selector: 'app-NotFound',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  
  constructor(@Optional() @Inject(request) private request: Request,
  @Optional() @Inject(response) private response: Response,
  @Inject(PLATFORM_ID) private platformId: any) {
}


ngOnInit() {
   if (isPlatformServer(this.platformId)) {
    //this.response.status(404);
  }
}

  
}
