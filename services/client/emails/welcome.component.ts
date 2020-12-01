import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'are-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.sass'],
})
export class WelcomeComponent {
  name: string

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.queryParamMap.get('name') || 'Template'
  }
}
