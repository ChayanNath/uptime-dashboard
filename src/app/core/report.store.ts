import { Injectable, signal, computed } from '@angular/core';
import { Report } from '../shared/models/report.model';

const STORAGE_KEY = 'reports';

@Injectable({ providedIn: 'root' })
export class ReportStore {
  private reports = signal<Report[]>(this.load());

  selectedId = signal<string | null>(null);
  search = signal('');
  page = signal(1);

  readonly pageSize = 12;

  filteredReports = computed(() => {
    const s = this.search().toLowerCase();
    return this.reports().filter(
      (r) => r.title.toLowerCase().includes(s) || r.subtitle.toLowerCase().includes(s),
    );
  });

  paginatedReports = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredReports().slice(start, start + this.pageSize);
  });

  selectedReport = computed(() => this.reports().find((r) => r.id === this.selectedId()) ?? null);

  add(report: Report) {
    const updated = [...this.reports(), report];
    this.reports.set(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  select(id: string) {
    this.selectedId.set(id);
  }

  generateMetrics() {
    return {
      openAlerts: this.rand(50, 150),
      closingRate: this.rand(30, 90),
      oldestAlertDays: this.rand(10, 200),
      unitData: Array.from({ length: 6 }).map(() => this.rand(2, 12)),
      distribution: [this.rand(10, 40), this.rand(10, 30), this.rand(10, 30), this.rand(10, 30)],
    };
  }

  private rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private load(): Report[] {
    const reports = localStorage.getItem(STORAGE_KEY);
    if (reports) return JSON.parse(reports);

    const seed = Array.from({ length: 15 }).map((_, i) => ({
      id: crypto.randomUUID(),
      title: `Report ${i + 1}`,
      subtitle: `System Metrics`,
      metrics: this.generateMetrics(),
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  totalPages = computed(() => Math.ceil(this.filteredReports().length / this.pageSize));

  nextPage() {
    this.page.update((p) => Math.min(p + 1, this.totalPages()));
  }

  prevPage() {
    this.page.update((p) => Math.max(p - 1, 1));
  }

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
}
