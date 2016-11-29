/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlobusComponent } from './globus.component';

describe('GlobusComponent', () => {
  let component: GlobusComponent;
  let fixture: ComponentFixture<GlobusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
