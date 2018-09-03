import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListLoteComponent} from './list-lote/list-lote.component';
import {ListLotesComponent} from './list-lotes/list-lotes.component';
import {LogComponent} from './log/log.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lotes'
    },
    component: ListLotesComponent
  },
  {
    path: ':id/ver',
    data: {
      title: 'Ver'
    },
    component: ListLoteComponent
  },
  {
    path: ':id/log',
    data: {
      title: 'Log'
    },
    component: LogComponent
  },
  {
    path: 'agregar',
    data: {
      title: 'Agregar'
    },
    component: ListLoteComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotesRoutingModule { }
