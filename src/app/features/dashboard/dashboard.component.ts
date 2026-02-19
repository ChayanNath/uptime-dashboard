import { Component } from '@angular/core';
import { Charts } from './components/charts/charts';
import { ReportList } from './components/report-list/report-list';
import { StatsCards } from './components/stats-cards/stats-cards';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [ReportList, StatsCards, Charts],
  template: `
    <div
      class="min-h-[calc(100vh-56px)] bg-gradient-to-br from-[#f3f2ff] to-[#ecebfa] p-6 flex flex-col"
    >
      <h1 class="text-xl font-semibold text-gray-800 mb-6">Take-Home</h1>

      <div class="mb-6">
        <app-stats-cards />
      </div>

      <div class="grid grid-cols-12 gap-6 flex-1">
        <div class="col-span-3 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <app-report-list class="flex-1" />
        </div>

        <div class="col-span-9 bg-white rounded-xl shadow-sm p-6">
          <app-charts />
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
