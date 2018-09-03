import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'solicitud',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        children: [
          {
            path: 'solicitud',
            loadChildren: './solicitud/solicitud.module#SolicitudModule'
          },
          {
            path: 'solicitudv2',
            loadChildren: './solicitudv2/solicitudv2.module#Solicitudv2Module'
          },
          {
            path: 'log',
            loadChildren: './log/log.module#LogModule'
          },
          {
            path: 'lotes',
            loadChildren: './lotes/lotes.module#LotesModule'
          }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
