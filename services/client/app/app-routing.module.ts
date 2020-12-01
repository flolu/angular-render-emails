import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: 'emails',
    loadChildren: () => import('../emails/emails.module').then(m => m.EmailsModule),
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
