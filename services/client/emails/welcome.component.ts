import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'are-welcome',
  template: `
    <h1>Hi, {{ name }}</h1>
    <p>Welcome! You are reading an email that has been rendered with Angular on a NodeJs server.</p>
  `,
  styleUrls: ['welcome.component.sass'],
})
export class WelcomeComponent {
  name: string

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.queryParamMap.get('name') || 'Template'
  }
}
