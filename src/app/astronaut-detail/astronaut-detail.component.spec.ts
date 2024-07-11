import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautDetailComponent } from './astronaut-detail.component';

describe('AstronautDetailComponent', () => {
  let component: AstronautDetailComponent;
  let fixture: ComponentFixture<AstronautDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstronautDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstronautDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
