import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

Chart.register(...registerables);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: any) {
    const { ctx, chartArea } = chart;
    if (!chart.config.data.datasets.length) return;
    
    let arr = chart.config.data.datasets[0].data as number[];
    const value = Math.ceil(arr.reduce((a,b) => a + Number(b), 0));

    ctx.save();
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const x = (chartArea.left + chartArea.right) / 2;
    const y = (chartArea.top + chartArea.bottom) / 2;
    ctx.fillText(value + ' kg', x, y);
    ctx.restore();
  }
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  wasteByDateChart: any;
  wasteByStatusChart: any;
  wasteByTypeChart: any;
  totalWasteChart: any;

  loadingDashboard = true;

  totalWasteValue = 0;

  wasteBreakdown: { wasteType: string; quantity: number }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadAnalytics();
    this.loadingDashboard = false;
  }

  loadAnalytics() {

    this.loadingDashboard = true;

    forkJoin({
      wasteType: this.authService.get('/analytics/waste-by-type'),
      wasteDate: this.authService.get('/analytics/waste-by-date'),
      wasteStatus: this.authService.get('/analytics/waste-by-status'),
      wasteSum: this.authService.get('/analytics/waste-sum')
    }).subscribe({
      next: (results: any) => {
        setTimeout(() => {
          const typeLabels = Object.keys(results.wasteType);
          const typeValues = Object.values(results.wasteType).map((v: any) => Number(v));
        
          this.updateChartData(typeLabels, typeValues);

          const dateLabels = Object.keys(results.wasteDate);
          const dateValues = Object.values(results.wasteDate).map((v: any) => Number(v));

          this.renderDateChart(dateLabels, dateValues);

          const statusLabels = Object.keys(results.wasteStatus);
          const statusValues = Object.values(results.wasteStatus).map((v: any) => Number(v));

          this.renderStatusChart(statusLabels, statusValues);

          const total = typeof results.wasteSum === 'number'
            ? results.wasteSum
            : results.wasteSum.totalKg;
        
          this.wasteBreakdown = (results.wasteSum.breakdown || []).map((item:any)=>({
            wasteType: item.wasteType,
            quantity: item.quantity
          }));

          this.renderTotalWasteChart();
        }, 0);
      },
      error: (err) => {
        console.error("Dashboard analytics failed", err);
        this.loadingDashboard = false;
      }
    });
  }

  loadAnalyticsByDate() {
    this.authService.get('/analytics/waste-by-date').subscribe((data: any) => {

        const labels = Object.keys(data);
        const values = Object.values(data).map(a => Number(a));

        this.renderDateChart(labels, values);

      });
  }

  renderDateChart(labels: string[], values: number[]) {

    if (this.wasteByDateChart) this.wasteByDateChart.destroy();

    this.wasteByDateChart = new Chart('wasteDate', {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Waste Collected', data: values, borderWidth: 1 }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

  loadAnalyticsByStatus() {
    this.authService.get('/analytics/waste-by-status')
      .subscribe((data: any) => {

        const labels = Object.keys(data);
        const values = Object.values(data).map(a => Number(a));

        this.renderStatusChart(labels, values);

      });
  }

  renderStatusChart(labels: string[], values: number[]) {

    if (this.wasteByStatusChart) this.wasteByStatusChart.destroy();

    this.wasteByStatusChart = new Chart('wasteStatus', {
      type: 'pie',
      data: { labels, datasets: [{ data: values }] },
      options: { responsive: true }
    });
  }

  loadAnalyticsByType() {

    this.authService.get('/analytics/waste-by-type').subscribe({

        next: (data: Record<string, number> | any[]) => {

          const labels = Object.keys(data);
          const values = Object.values(data).map(v => Number(v) || 0);
          this.updateChartData(labels, values);

        },
        error: error => {
          console.error("Error from 'By Type': ", error);
          const defaultLabels = ['Glass','Plastic','Metal'];
          const defaultValues = [1,1,1];
          
          this.updateChartData(defaultLabels, defaultValues);

        }
      });
  }

  loadTotalWaste() {
    this.authService.get('/analytics/waste-sum').subscribe((data: any) => {

        const total = typeof data === 'number'
          ? data
          : data.totalKg;

        const breakdown = (data.breakdown || []).map((item: any) => ({
          wasteType: item.wasteType,
          quantity: item.quantity
        }));

        this.totalWasteValue = total || 0;
        this.wasteBreakdown = breakdown;
        
        this.renderTotalWasteChart();
      });
  }

  renderTotalWasteChart() {
    if (this.totalWasteChart) this.totalWasteChart.destroy();

    const labels = this.wasteBreakdown.map(w => w.wasteType);
    const values = this.wasteBreakdown.map(w => w.quantity);
    const data = values.length ? values : [this.totalWasteValue];

    this.totalWasteChart = new Chart('totalWaste', {
      type: 'doughnut',
      data: {
        labels: labels.length ? labels : ['Total Waste'],
        datasets:[{ data, borderWidth:1 }]
      },
      options:{
        responsive:true,
        plugins:{
          legend:{ display: true },
          tooltip:{ enabled: true }
        }
      },
      plugins:[centerTextPlugin]
    });
  }

  updateChartData(labels:string[], values:number[]) {

    if (this.wasteByTypeChart) this.wasteByTypeChart.destroy();
    
    this.wasteByTypeChart = new Chart('wasteTrend', {
      type:'bar',
      data:{
        labels, datasets:[
          {
            label:'Waste By Type',
            data: values,
            backgroundColor:['#2196F3','#FFC107','#4CAF50','#FF5722','#9C27B0'],
            borderColor:'rgba(54,162,235,1)',
            borderWidth:2,
            borderRadius:6
          }
        ]
      },
      options:{ responsive:true, scales:{ y:{ beginAtZero:true } } }
    });
  }

  get totalWasteCount(): number {
    return this.wasteBreakdown?.length ?? 0;
  }

  get totalWasteTypes(): number {
    return this.wasteBreakdown?.reduce(
      (sum, w) => sum + Number(w.quantity),
      0
    ) ?? 0;
  }
}