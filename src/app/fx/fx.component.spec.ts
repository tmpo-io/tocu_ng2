/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FxComponent } from './fx.component';

describe('FxComponent', () => {
  let component: FxComponent;
  let fixture: ComponentFixture<FxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
