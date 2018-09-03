import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './solicitud.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Solicitud'
        },
        component: SolicitudComponent

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudRoutingModule { }