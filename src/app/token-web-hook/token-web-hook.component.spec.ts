import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenWebHookComponent } from './token-web-hook.component';

describe('TokenWebHookComponent', () => {
  let component: TokenWebHookComponent;
  let fixture: ComponentFixture<TokenWebHookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenWebHookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenWebHookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
