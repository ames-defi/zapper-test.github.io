import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenSwapComponent } from './token-swap.component';

describe('TokenSwapComponent', () => {
  let component: TokenSwapComponent;
  let fixture: ComponentFixture<TokenSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
