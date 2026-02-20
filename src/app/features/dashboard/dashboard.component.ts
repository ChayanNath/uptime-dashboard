import { Component, signal } from '@angular/core';
import { Charts } from './components/charts/charts';
import { ReportList } from './components/report-list/report-list';
import { StatsCards } from './components/stats-cards/stats-cards';
import { AddReportModal } from './components/add-report-modal/add-report-modal';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [ReportList, StatsCards, Charts, AddReportModal],
  template: `
    @if (open()) {
      <app-add-report-modal (close)="open.set(false)" />
    }
    <div
      class="min-h-[calc(100vh-56px)] bg-gradient-to-br from-[#f4f3ff] to-[#ecebfa] p-8 flex flex-col"
    >
      <h1 class="text-xl font-semibold text-gray-800 mb-6">Take-Home</h1>

      <div class="mb-8">
        <app-stats-cards />
      </div>

      <div class="grid grid-cols-12 gap-6 flex-1">
        <div
          class="col-span-3 bg-white/80 backdrop-blur rounded-2xl
            shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex flex-col"
        >
          <app-report-list class="flex-1" (add)="open.set(true)" />
        </div>

        <div
          class="col-span-9 bg-white/80 backdrop-blur rounded-2xl
            shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6"
        >
          <app-charts />
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  open = signal(false);
}
