import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ReportStore } from '../../../../core/report.store';

@Component({
  selector: 'app-report-list',
  imports: [],
  templateUrl: './report-list.html',
  styleUrl: './report-list.scss',
})
export class ReportList {
  @Output() add = new EventEmitter<void>();
  store = inject(ReportStore);
}
