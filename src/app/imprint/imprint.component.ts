import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
  animations: [
    trigger('enterComponent', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ImprintComponent implements OnInit {
  isMobile!: boolean;
  positionClass: string = "right-center";

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isMobile = params['isMobile'];
    });

    if(this.isMobile){
      this.positionClass = "center";
    }
    else {
      this.positionClass = "right-center";
    }
  }
}
