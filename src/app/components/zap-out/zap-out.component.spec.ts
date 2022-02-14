import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapOutComponent } from './zap-out.component';

describe('ZapOutComponent', () => {
  let component: ZapOutComponent;
  let fixture: ComponentFixture<ZapOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZapOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
