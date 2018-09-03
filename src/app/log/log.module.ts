import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogRoutingModule} from './log-routing.module';
import {CalendarModule, ConfirmDialogModule, DataTableModule, TooltipModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {CoreModule} from '../core/core.module';
import {ButtonModule} from 'primeng/button';
import {EditorModule} from 'primeng/editor';
import {PanelModule} from 'primeng/panel';
import {LogComponent} from './log.component';

@NgModule({
  imports: [
    CoreModule,
    LogRoutingModule,
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
  declarations: [LogComponent]
})
export class LogModule { }
