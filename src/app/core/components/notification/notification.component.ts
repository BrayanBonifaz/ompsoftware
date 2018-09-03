import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng';
import {Subscription} from 'rxjs/Subscription';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationService.notificationChange
      .subscribe(notification => {
        this.msgs.length = 0;
        this.msgs.push(notification);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
