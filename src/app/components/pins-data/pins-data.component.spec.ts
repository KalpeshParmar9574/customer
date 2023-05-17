import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsDataComponent } from './pins-data.component';

describe('PinsDataComponent', () => {
  let component: PinsDataComponent;
  let fixture: ComponentFixture<PinsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
