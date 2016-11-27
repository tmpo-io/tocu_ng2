/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WordprogressComponent } from './wordprogress.component';

describe('WordprogressComponent', () => {
  let component: WordprogressComponent;
  let fixture: ComponentFixture<WordprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
