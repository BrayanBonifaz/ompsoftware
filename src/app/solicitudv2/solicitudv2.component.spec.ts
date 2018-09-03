import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Solicitudv2Component } from './solicitudv2.component';

describe('Solicitudv2Component', () => {
  let component: Solicitudv2Component;
  let fixture: ComponentFixture<Solicitudv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Solicitudv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Solicitudv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
