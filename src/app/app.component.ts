import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyApplication';

  stateFlag = false;

    toggleState() {
        this.stateFlag = !this.stateFlag;
    }

    submit() {
        console.log('Button submitted');
    }

    calculateClasses() {
        return {
            btn: true,
            'btn-primary': true,
            'btn-extra-class': this.stateFlag
        };
    }
}
