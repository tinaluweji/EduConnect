// Data Selection Tool - cPanel Safe Version
document.addEventListener('DOMContentLoaded', () => {

    let mainChart = null;
    let currentChartType = 'bar';

    const filters = {
        region: 'all',
        districts: ['all'],
        schoolType: 'all',
        subject: 'all',
        metric: 'performance',
        timeRange: 'current'
    };

    /* -------------------- DATA -------------------- */

    const datasets = {
        performance: {
            labels: [
                'Nalolo District',
                'Sioma District',
                'Luampa District',
                'Nkeyema District',
                'Mongu District',
                'Sikongo District'
            ],
            values: [84.7, 72.3, 68.9, 76.5, 81.2, 63.4]
        }
    };

    /* -------------------- HELPERS -------------------- */

    function notify(message, type = 'info') {
        const existing = document.querySelector('.data-notification');
        if (existing) existing.remove();

        const note = document.createElement('div');
        note.className = `data-notification ${type}`;
        note.textContent = message;

        document.body.appendChild(note);

        setTimeout(() => {
            note.remove();
        }, 3000);
    }

    function buildChartData() {
        return {
            labels: datasets.performance.labels,
            datasets: [{
                label: 'Student Performance (%)',
                data: datasets.performance.values,
                backgroundColor: '#2563eb'
            }]
        };
    }

    /* -------------------- CHART -------------------- */

    function renderChart() {
        const canvas = document.getElementById('mainChart');
        if (!canvas) return;

        if (mainChart) {
            mainChart.destroy();
        }

        mainChart = new Chart(canvas, {
            type: currentChartType,
            data: buildChartData(),
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }

    /* -------------------- FILTERS -------------------- */

    function applyFilters() {
        filters.metric = document.getElementById('metric-select').value;
        renderChart();
        notify('Dashboard updated', 'success');
    }

    function resetFilters() {
        document.getElementById('metric-select').value = 'performance';
        applyFilters();
        notify('Filters reset', 'info');
    }

    /* -------------------- EXPORTS -------------------- */

    function exportPNG() {
        if (!mainChart) return;

        const link = document.createElement('a');
        link.href = mainChart.toBase64Image();
        link.download = 'EduConnect-Chart.png';
        document.body.appendChild(link);
        link.click();
        link.remove();

        notify('Chart exported as PNG', 'success');
    }

    /* -------------------- EVENTS -------------------- */

    function bindEvents() {
        document.getElementById('apply-filters')
            .addEventListener('click', applyFilters);

        document.getElementById('reset-filters')
            .addEventListener('click', resetFilters);

        document.querySelectorAll('.chart-type-btn')
            .forEach(btn => {
                btn.addEventListener('click', () => {
                    currentChartType = btn.dataset.chartType;
                    renderChart();
                });
            });

        document.getElementById('export-png')
            .addEventListener('click', exportPNG);
    }

    /* -------------------- INIT -------------------- */

    function init() {
        renderChart();
        bindEvents();
        notify('Dashboard loaded successfully', 'success');
    }

    init();
});
