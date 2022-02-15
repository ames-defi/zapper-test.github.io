import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapsContainerComponent } from './zaps-container.component';

describe('ZapsContainerComponent', () => {
  let component: ZapsContainerComponent;
  let fixture: ComponentFixture<ZapsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZapsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
