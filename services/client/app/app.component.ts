import {isPlatformBrowser} from '@angular/common'
import {Component, Inject, PLATFORM_ID} from '@angular/core'
import {UpdateAvailableEvent} from '@angular/service-worker'
import {fromEvent, merge, Observable, of} from 'rxjs'
import {mapTo} from 'rxjs/operators'

import {ServiceWorkerService} from './service-worker.service'

@Component({
  selector: 'are-root',
  template: `
    <h1>App Component</h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.sass'],
})
export class AppComponent {
  offline$: Observable<boolean>
  availableSwUpdate: UpdateAvailableEvent

  constructor(
    private serviceWorkerService: ServiceWorkerService,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      this.handleConnectivity()
      this.handleSwUpdates()
    }
  }

  onUpdateServiceWorker() {
    this.serviceWorkerService.forceUpdateNow()
  }

  private handleSwUpdates() {
    this.serviceWorkerService.launchUpdateCheckingRoutine()
    this.serviceWorkerService.launchUpdateHandler(event => {
      this.availableSwUpdate = event
    })
  }

  private handleConnectivity() {
    this.offline$ = merge(
      of(!navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(false)),
      fromEvent(window, 'offline').pipe(mapTo(true)),
    )
  }
}
