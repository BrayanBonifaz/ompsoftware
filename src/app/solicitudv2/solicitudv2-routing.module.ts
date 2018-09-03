import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Solicitudv2Component } from './solicitudv2.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Solicitudv2'
        },
        component: Solicitudv2Component

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Solicitudv2RoutingModule { }