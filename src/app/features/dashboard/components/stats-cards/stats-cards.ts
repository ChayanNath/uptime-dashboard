import { Component, computed, inject } from '@angular/core';
import { ReportStore } from '../../../../core/report.store';

@Component({
  standalone: true,
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.html',
})
export class StatsCards {
  store = inject(ReportStore);

  report = this.store.selectedReport;

  openAlerts = computed(() => this.report()?.metrics.openAlerts ?? 0);
  closingRate = computed(() => this.report()?.metrics.closingRate ?? 0);
  oldestAlert = computed(() => this.report()?.metrics.oldestAlertDays ?? 0);
}
