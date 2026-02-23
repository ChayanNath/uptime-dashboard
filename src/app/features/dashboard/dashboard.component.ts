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

    @if (mobileMenu()) {
      <div class="fixed inset-0 z-40 bg-black/30" (click)="mobileMenu.set(false)"></div>

      <div class="fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-xl">
        <app-report-list (add)="open.set(true)" />
      </div>
    }

    <div
      class="min-h-[calc(100vh-56px)] bg-gradient-to-br from-[#f4f3ff] to-[#ecebfa] p-4 sm:p-8 flex flex-col"
    >
      <div class="flex items-center gap-3 mb-6">
        <button class="lg:hidden" (click)="mobileMenu.set(true)">
          <span class="material-icons">menu</span>
        </button>

        <h1 class="text-xl font-semibold text-gray-800">Take-Home</h1>
      </div>

      <div class="mb-8">
        <app-stats-cards />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        <div
          class="hidden lg:flex lg:col-span-3 bg-white/80 backdrop-blur rounded-2xl
          shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex-col"
        >
          <app-report-list class="flex-1" (add)="open.set(true)" />
        </div>

        <div
          class="lg:col-span-9 bg-white/80 backdrop-blur rounded-2xl
          shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6"
        >
          <app-charts />
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  open = signal(false);
  mobileMenu = signal(false);
}
