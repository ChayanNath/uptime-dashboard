import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportModal } from './add-report-modal';

describe('AddReportModal', () => {
  let component: AddReportModal;
  let fixture: ComponentFixture<AddReportModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReportModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReportModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
