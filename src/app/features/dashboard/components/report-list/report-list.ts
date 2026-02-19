import { Component, inject, signal } from '@angular/core';
import { ReportStore } from '../../../../core/report.store';

@Component({
  selector: 'app-report-list',
  imports: [],
  templateUrl: './report-list.html',
  styleUrl: './report-list.scss',
})
export class ReportList {
  store = inject(ReportStore);

  open = signal(false);
}
