import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsContainerComponent } from './tickets-container.component';

describe('TicketsContainerComponent', () => {
  let component: TicketsContainerComponent;
  let fixture: ComponentFixture<TicketsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
