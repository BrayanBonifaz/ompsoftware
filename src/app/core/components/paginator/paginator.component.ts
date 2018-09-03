import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent implements OnInit {

  @Input() rows: number;
  @Input() totalRecords: number;
  @Output() onPageChange: any = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  paginate(event){
    this.onPageChange.emit(event);
  }
}
