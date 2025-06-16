import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestComparisionComponent } from './interest-comparision.component';

describe('InterestComparisionComponent', () => {
  let component: InterestComparisionComponent;
  let fixture: ComponentFixture<InterestComparisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestComparisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
