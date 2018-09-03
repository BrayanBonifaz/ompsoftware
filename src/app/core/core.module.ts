import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaginatorModule } from 'primeng/paginator';
import { NotificationComponent } from './components/notification/notification.component';
import { GrowlModule } from 'primeng/components/growl/growl';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PaginatorModule,
    RouterModule,
    GrowlModule
  ],
  declarations: [NavbarComponent, FooterComponent,
    HeaderComponent, PaginatorComponent, NotificationComponent],
  exports: [NavbarComponent, FooterComponent,
    HeaderComponent, PaginatorComponent, NotificationComponent]
})
export class CoreModule { }
