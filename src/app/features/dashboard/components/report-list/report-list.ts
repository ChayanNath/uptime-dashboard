import { Component, inject, signal } from '@angular/core';
import { ReportStore } from '../../../../core/report.store';
import { AddReportModal } from '../add-report-modal/add-report-modal';

@Component({
  selector: 'app-report-list',
  imports: [AddReportModal],
  templateUrl: './report-list.html',
  styleUrl: './report-list.scss',
})
export class ReportList {
  store = inject(ReportStore);

  open = signal(false);
}
