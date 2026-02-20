import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { ReportStore } from '../../../../core/report.store';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-charts',
  imports: [],
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
})
export class Charts {
  @ViewChild('bar') barRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pie') pieRef!: ElementRef<HTMLCanvasElement>;

  protected store = inject(ReportStore);

  private barChart?: Chart;
  private pieChart?: Chart;

  constructor() {
    effect(() => {
      const report = this.store.selectedReport();
      if (!report) return;

      queueMicrotask(() => this.render(report));
    });
  }

  private render(report: any) {
    this.barChart?.destroy();
    this.pieChart?.destroy();

    this.barChart = new Chart(this.barRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'],
        datasets: [
          {
            label: 'In Process',
            data: report.metrics.unitData.map((x: number) => Math.floor(x * 0.4)),
            backgroundColor: '#c7d2fe',
            borderRadius: 6,
          },
          {
            label: 'Unacknowledged',
            data: report.metrics.unitData.map((x: number) => Math.floor(x * 0.3)),
            backgroundColor: '#a5b4fc',
            borderRadius: 6,
          },
          {
            label: 'On Watch',
            data: report.metrics.unitData.map((x: number) => Math.floor(x * 0.3)),
            backgroundColor: '#4f46e5',
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 8,
              boxHeight: 8,
              padding: 24,
              font: {
                size: 12,
              },
              color: '#6b7280',
            },
          },

          datalabels: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
          },
          y: {
            stacked: true,
            grid: { color: '#f1f5f9' },
            beginAtZero: true,
          },
        },
      },
    });

    this.pieChart = new Chart(this.pieRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Open', 'In Process', 'Acknowledged', 'On Watch'],
        datasets: [
          {
            data: report.metrics.distribution,
            backgroundColor: ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe'],
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              boxWidth: 6,
            },
          },

          datalabels: {
            color: '#fff',
            font: {
              weight: 600,
              size: 12,
            },
            formatter: (value, ctx) => {
              const data = (ctx.dataset.data as number[]).filter((v) => typeof v === 'number');

              const total = data.reduce((sum, v) => sum + v, 0);

              return Math.round((Number(value) / total) * 100) + '%';
            },
          },
        },
      },
    });
  }
}
