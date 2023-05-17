import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinsComponent } from './add-pins.component';

describe('AddPinsComponent', () => {
  let component: AddPinsComponent;
  let fixture: ComponentFixture<AddPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
