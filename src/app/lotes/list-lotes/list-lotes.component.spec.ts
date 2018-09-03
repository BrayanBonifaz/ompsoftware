import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLotesComponent } from './list-lotes.component';

describe('ListLotesComponent', () => {
  let component: ListLotesComponent;
  let fixture: ComponentFixture<ListLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
