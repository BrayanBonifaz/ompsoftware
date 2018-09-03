import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotesRoutingModule } from './lotes-routing.module';
import { ListLotesComponent } from './list-lotes/list-lotes.component';
import { ListLoteComponent } from './list-lote/list-lote.component';
import {LogComponent} from './log/log.component';
import {CalendarModule, ConfirmDialogModule, DataTableModule, TooltipModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {EditorModule} from 'primeng/editor';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {CoreModule} from '../core/core.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CoreModule,
    LotesRoutingModule,
    CommonModule,
    DataTableModule,
    TableModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    EditorModule,
    PanelModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule
  ],
  declarations: [ListLotesComponent, ListLoteComponent, LogComponent]
})
export class LotesModule { }
