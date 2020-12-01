import {Inject, NgModule} from '@angular/core'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'
import {AppBaseModule} from './app-base.module'
import {AppComponent} from './app.component'

@NgModule({
  imports: [AppBaseModule],
  bootstrap: [AppComponent],
})
export class AppDevModule {
  constructor(@Inject(ENVIRONMENT) private environment: ClientEnvironment) {
    console.log(`🛠️ Launching development app`, this.environment)
  }
}
