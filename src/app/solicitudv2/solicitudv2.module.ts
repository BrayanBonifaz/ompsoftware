import { NotificationService } from './../core/components/notification/notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Solicitudv2Component } from './solicitudv2.component';
import { Solicitudv2RoutingModule } from './solicitudv2-routing.module';
import { CoreModule } from '../core/core.module';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule, ConfirmDialogModule, DataTableModule, TooltipModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/editor';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    Solicitudv2RoutingModule,
    CommonModule,
    Solicitudv2RoutingModule,
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
  declarations: [Solicitudv2Component],
  providers:[]
})
export class Solicitudv2Module { }
