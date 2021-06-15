import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerangeSelectorComponent } from './timerange-selector.component';

describe('TimerangeSelectorComponent', () => {
  let component: TimerangeSelectorComponent;
  let fixture: ComponentFixture<TimerangeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerangeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
