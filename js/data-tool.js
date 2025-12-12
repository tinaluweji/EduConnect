// Data Selection Tool - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let mainChart = null;
    let currentChartType = 'bar';
    let currentData = null;
    let filters = {
        region: 'all',
        districts: ['all'],
        schoolType: 'all',
        subject: 'all',
        grades: ['all'],
        metric: 'performance',
        timeRange: 'current',
        customRange: { start: 2022, end: 2025 },
        compareTrend: true,
        showProjections: false
    };
    
    // Sample datasets
    const datasets = {
        performance: {
            labels: ['Nalolo District', 'Sioma District', 'Luampa District', 'Nkeyema District', 'Mongu District', 'Sikongo District'],
            datasets: [{
                label: 'Student Performance (%)',
                data: [84.7, 72.3, 68.9, 76.5, 81.2, 63.4],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    'rgb(37, 99, 235)',
                    'rgb(14, 165, 233)',
                    'rgb(139, 92, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 1
            }]
        },
        growth: {
            labels: ['Nalolo District', 'Sioma District', 'Luampa District', 'Nkeyema District', 'Mongu District', 'Sikongo District'],
            datasets: [{
                label: 'Student Growth (Points)',
                data: [8.3, 4.7, 3.2, 5.8, 7.1, 2.4],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 1
            }]
        },
        attendance: {
            labels: ['Nalolo District', 'Sioma District', 'Luampa District', 'Nkeyema District', 'Mongu District', 'Sikongo District'],
            datasets: [{
                label: 'Attendance Rate (%)',
                data: [94.2, 88.7, 85.3, 91.6, 92.8, 82.1],
                backgroundColor: 'rgba(245, 158, 11, 0.7)',
                borderColor: 'rgb(245, 158, 11)',
                borderWidth: 1
            }]
        },
        engagement: {
            labels: ['Nalolo District', 'Sioma District', 'Luampa District', 'Nkeyema District', 'Mongu District', 'Sikongo District'],
            datasets: [{
                label: 'Student Engagement Score',
                data: [8.7, 7.2, 6.5, 8.1, 8.4, 5.9],
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                borderColor: 'rgb(139, 92, 246)',
                borderWidth: 1
            }]
        }
    };
    
    // Time series data for line charts
    const timeSeriesData = {
        performance: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    label: 'Mongu District',
                    data: [78.3, 79.1, 81.4, 83.2, 84.7],
                    borderColor: 'rgb(37, 99, 235)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Luampa District',
                    data: [65.8, 67.2, 69.4, 70.8, 72.3],
                    borderColor: 'rgb(14, 165, 233)',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Sikongo District',
                    data: [58.4, 59.7, 61.2, 62.8, 63.4],
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }
            ]
        }
    };
    
    // Table data
    const tableData = [
        { district: 'Mongu District', subject: 'Mathematics', grade: '7-9', performance: 84.7, growth: 8.3, trend: 'up' },
        { district: 'Mongu District', subject: 'Science', grade: '7-9', performance: 82.4, growth: 7.8, trend: 'up' },
        { district: 'Mongu District', subject: 'Literacy', grade: '7-9', performance: 87.2, growth: 8.9, trend: 'up' },
        { district: 'Luampa District', subject: 'Mathematics', grade: '7-9', performance: 72.3, growth: 4.7, trend: 'up' },
        { district: 'Luampa District', subject: 'Science', grade: '7-9', performance: 70.8, growth: 4.2, trend: 'up' },
        { district: 'Luampa District', subject: 'Literacy', grade: '7-9', performance: 73.8, growth: 5.1, trend: 'neutral' },
        { district: 'Sioma District', subject: 'Mathematics', grade: '7-9', performance: 68.9, growth: 3.2, trend: 'neutral' },
        { district: 'Sioma District', subject: 'Science', grade: '7-9', performance: 66.7, growth: 2.8, trend: 'down' },
        { district: 'Sioma District', subject: 'Literacy', grade: '7-9', performance: 71.2, growth: 3.7, trend: 'up' },
        { district: 'Sikongo District', subject: 'Mathematics', grade: '7-9', performance: 63.4, growth: 2.4, trend: 'up' },
        { district: 'Sikongo District', subject: 'Science', grade: '7-9', performance: 61.8, growth: 1.9, trend: 'neutral' },
        { district: 'Sikongo District', subject: 'Literacy', grade: '7-9', performance: 65.1, growth: 2.8, trend: 'up' }
    ];
    
    // Initialize multi-select dropdowns
    function initializeSelects() {
        // District select
        const districtSelect = new Choices('#district-select', {
            removeItemButton: true,
            maxItemCount: 5,
            searchResultLimit: 10,
            placeholder: true,
            placeholderValue: 'Select districts',
            searchPlaceholderValue: 'Search districts...'
        });
        
        // Grade level select
        const gradeSelect = new Choices('#grade-level', {
            removeItemButton: true,
            maxItemCount: 4,
            searchResultLimit: 5,
            placeholder: true,
            placeholderValue: 'Select grade levels',
            searchPlaceholderValue: 'Search grade levels...'
        });
        
        return { districtSelect, gradeSelect };
    }
    
    // Initialize the main chart
    function initializeChart() {
        const ctx = document.getElementById('mainChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (mainChart) {
            mainChart.destroy();
        }
        
        // Get data based on current metric and filters
        const chartData = getChartData();
        
        // Chart configuration
        const config = {
            type: currentChartType,
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    if (filters.metric === 'performance' || filters.metric === 'attendance') {
                                        label += context.parsed.y + '%';
                                    } else if (filters.metric === 'growth') {
                                        label += '+' + context.parsed.y + ' points';
                                    } else {
                                        label += context.parsed.y + '/10';
                                    }
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        display: currentChartType === 'pie' || currentChartType === 'radar',
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value, context) {
                            if (filters.metric === 'performance' || filters.metric === 'attendance') {
                                return value + '%';
                            }
                            return value;
                        }
                    }
                },
                scales: (currentChartType === 'bar' || currentChartType === 'line') ? {
                    y: {
                        beginAtZero: filters.metric !== 'growth',
                        ticks: {
                            callback: function(value) {
                                if (filters.metric === 'performance' || filters.metric === 'attendance') {
                                    return value + '%';
                                }
                                return value;
                            }
                        }
                    }
                } : {}
            },
            plugins: [ChartDataLabels]
        };
        
        // Create new chart
        mainChart = new Chart(ctx, config);
    }
    
    // Get chart data based on current filters and chart type
    function getChartData() {
        let data;
        
        if (currentChartType === 'line' && filters.timeRange !== 'current') {
            // Use time series data for line charts with time range
            data = JSON.parse(JSON.stringify(timeSeriesData.performance));
            
            // Apply subject filter if not "all"
            if (filters.subject !== 'all') {
                const subjectMap = {
                    'math': 'Mathematics',
                    'science': 'Science',
                    'literacy': 'Literacy'
                };
                
                data.datasets = data.datasets.map(dataset => {
                    return {
                        ...dataset,
                        label: `${dataset.label} - ${subjectMap[filters.subject] || filters.subject}`
                    };
                });
            }
        } else {
            // Use regular dataset
            data = JSON.parse(JSON.stringify(datasets[filters.metric]));
            
            // Apply subject filter if not "all"
            if (filters.subject !== 'all') {
                const subjectMap = {
                    'math': 'Mathematics',
                    'science': 'Science',
                    'literacy': 'Literacy',
                    'social': 'Social Studies',
                    'language': 'Languages'
                };
                
                data.datasets[0].label = `${subjectMap[filters.subject] || filters.subject} ${data.datasets[0].label.split(' ').slice(1).join(' ')}`;
                
                // Adjust data values based on subject (simulated)
                if (filters.subject === 'math') {
                    data.datasets[0].data = [82.5, 70.8, 66.3, 74.9, 79.6, 61.2];
                } else if (filters.subject === 'science') {
                    data.datasets[0].data = [80.3, 68.7, 64.2, 72.8, 77.5, 59.1];
                } else if (filters.subject === 'literacy') {
                    data.datasets[0].data = [87.2, 75.6, 71.1, 79.7, 84.4, 66.0];
                }
            }
            
            // Apply district filter if not "all"
            if (!filters.districts.includes('all') && filters.districts.length > 0) {
                const allDistricts = ['Nalolo District', 'Sioma District', 'Luampa District', 'Nkeyema District', 'Mongu District', 'Sikongo District'];
                const districtIndices = filters.districts.map(d => {
                    const districtMap = {
                        'district1': 0, 'district2': 1, 'district3': 2, 
                        'district4': 3, 'district5': 4, 'district6': 5
                    };
                    return districtMap[d] !== undefined ? districtMap[d] : 0;
                }).sort((a, b) => a - b);
                
                data.labels = districtIndices.map(i => allDistricts[i]);
                data.datasets[0].data = districtIndices.map(i => data.datasets[0].data[i]);
                data.datasets[0].backgroundColor = districtIndices.map(i => data.datasets[0].backgroundColor[i]);
                data.datasets[0].borderColor = districtIndices.map(i => data.datasets[0].borderColor[i]);
            }
        }
        
        return data;
    }
    
    // Update chart title based on filters
    function updateChartTitle() {
        const metricTitles = {
            'performance': 'Student Performance',
            'growth': 'Student Growth',
            'attendance': 'Attendance Rate',
            'engagement': 'Student Engagement'
        };
        
        const subjectTitles = {
            'all': '',
            'math': ' in Mathematics',
            'science': ' in Science',
            'literacy': ' in Literacy',
            'social': ' in Social Studies',
            'language': ' in Languages'
        };
        
        const timeTitles = {
            'current': ' (Current Year)',
            '3year': ' (Last 3 Years)',
            '5year': ' (Last 5 Years)',
            'custom': ` (${filters.customRange.start}-${filters.customRange.end})`
        };
        
        let title = metricTitles[filters.metric] || 'Performance Data';
        title += subjectTitles[filters.subject] || '';
        title += timeTitles[filters.timeRange] || '';
        
        document.getElementById('chart-title').textContent = title;
        
        // Update subtitle
        let subtitle = '';
        if (!filters.districts.includes('all') && filters.districts.length > 0) {
            subtitle = 'Selected Districts';
        } else if (filters.region !== 'all') {
            const regionMap = {
                'north': 'Northern Region',
                'south': 'Southern Region',
                'east': 'Eastern Region',
                'west': 'Western Region',
                'central': 'Central Region'
            };
            subtitle = regionMap[filters.region] || 'All Regions';
        } else {
            subtitle = 'All Districts';
        }
        
        document.getElementById('chart-subtitle').textContent = subtitle;
    }
    
    // Update comparison metrics
    function updateComparisonMetrics() {
        const data = getChartData().datasets[0].data;
        
        // Calculate average
        const avg = data.reduce((sum, val) => sum + val, 0) / data.length;
        document.getElementById('avg-performance').textContent = avg.toFixed(1) + '%';
        
        // Find top district
        const maxIndex = data.indexOf(Math.max(...data));
        const districtNames = getChartData().labels;
        document.getElementById('top-district').textContent = districtNames[maxIndex] || 'N/A';
        
        // Calculate growth rate (simulated)
        const growthRate = (avg - 70) / 70 * 100;
        document.getElementById('growth-rate').textContent = (growthRate > 0 ? '+' : '') + growthRate.toFixed(1) + '%';
        
        // Calculate performance gap
        const max = Math.max(...data);
        const min = Math.min(...data);
        const gap = max - min;
        document.getElementById('performance-gap').textContent = gap.toFixed(1) + '%';
        
        // Update trend indicators
        const gapChange = document.querySelector('#performance-gap').parentElement.querySelector('.comparison-change');
        if (gap > 15) {
            gapChange.className = 'comparison-change negative';
            gapChange.innerHTML = '';
            const icon1 = document.createElement('i'); icon1.className='fas fa-exclamation-triangle';
            const span1 = document.createElement('span'); span1.textContent='High-need area identified';
            gapChange.appendChild(icon1); gapChange.appendChild(span1);
        } else if (gap > 10) {
            gapChange.className = 'comparison-change';
            gapChange.innerHTML = '';
            const icon2 = document.createElement('i'); icon2.className='fas fa-info-circle';
            const span2 = document.createElement('span'); span2.textContent='Moderate gap';
            gapChange.appendChild(icon2); gapChange.appendChild(span2);
        } else {
            gapChange.className = 'comparison-change positive';
            gapChange.innerHTML = '';
            const icon3 = document.createElement('i'); icon3.className='fas fa-check-circle';
            const span3 = document.createElement('span'); span3.textContent='Low gap - good equity';
            gapChange.appendChild(icon3); gapChange.appendChild(span3);
        }
    }
    
    // Populate data table
    function populateDataTable() {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
        
        // Filter table data based on current filters
        let filteredData = [...tableData];
        
        // Filter by subject
        if (filters.subject !== 'all') {
            const subjectMap = {
                'math': 'Mathematics',
                'science': 'Science',
                'literacy': 'Literacy'
            };
            filteredData = filteredData.filter(row => row.subject === subjectMap[filters.subject]);
        }
        
        // Filter by district
        if (!filters.districts.includes('all') && filters.districts.length > 0) {
            const districtMap = {
                'district1': ' Mongu District',
                'district2': 'Luampa District',
                'district3': 'Sioma District',
                'district6': 'Sikongo District'
            };
            const selectedDistricts = filters.districts.map(d => districtMap[d]).filter(d => d);
            filteredData = filteredData.filter(row => selectedDistricts.includes(row.district));
        }
        
        // Populate table rows
        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            
            // Determine trend indicator
            let trendClass, trendIcon, trendText;
            if (row.trend === 'up') {
                trendClass = 'trend-up';
                trendIcon = 'fas fa-arrow-up';
                trendText = 'Improving';
            } else if (row.trend === 'down') {
                trendClass = 'trend-down';
                trendIcon = 'fas fa-arrow-down';
                trendText = 'Declining';
            } else {
                trendClass = 'trend-neutral';
                trendIcon = 'fas fa-minus';
                trendText = 'Stable';
            }
            
            tr.innerHTML = `
                <td>${row.district}</td>
                <td>${row.subject}</td>
                <td>${row.grade}</td>
                <td>${row.performance}%</td>
                <td>${row.growth > 0 ? '+' : ''}${row.growth}</td>
                <td><span class="trend-indicator ${trendClass}"><i class="${trendIcon}"></i> ${trendText}</span></td>
            `;
            
            tableBody.appendChild(tr);
        });
        
        // If no data, show message
        if (filteredData.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" style="text-align: center; color: var(--gray);">No data available for the selected filters</td>`;
            tableBody.appendChild(tr);
        }
    }
    
    // Apply filters and update dashboard
    function applyFilters() {
        // Show loading indicator
        document.getElementById('data-loading').classList.add('active');
        
        // Get filter values
        filters.region = document.getElementById('region-select').value;
        
        const districtSelect = document.getElementById('district-select');
        filters.districts = Array.from(districtSelect.selectedOptions).map(option => option.value);
        if (filters.districts.length === 0) filters.districts = ['all'];
        
        filters.schoolType = document.getElementById('school-type').value;
        filters.subject = document.getElementById('subject-select').value;
        
        const gradeSelect = document.getElementById('grade-level');
        filters.grades = Array.from(gradeSelect.selectedOptions).map(option => option.value);
        if (filters.grades.length === 0) filters.grades = ['all'];
        
        filters.metric = document.getElementById('metric-select').value;
        filters.timeRange = document.getElementById('time-range').value;
        
        if (filters.timeRange === 'custom') {
            filters.customRange.start = parseInt(document.getElementById('start-year').value);
            filters.customRange.end = parseInt(document.getElementById('end-year').value);
        }
        
        filters.compareTrend = document.getElementById('compare-trend').checked;
        filters.showProjections = document.getElementById('show-projections').checked;
        
        // Simulate data loading delay
        setTimeout(() => {
            // Update dashboard
            updateChartTitle();
            initializeChart();
            updateComparisonMetrics();
            populateDataTable();
            
            // Hide loading indicator
            document.getElementById('data-loading').classList.remove('active');
            
            // Show success message
            showNotification('Dashboard updated with new filters', 'success');
        }, 800);
    }
    
    // Reset all filters to default
    function resetFilters() {
        document.getElementById('region-select').value = 'all';
        
        const districtSelect = document.getElementById('district-select');
        Array.from(districtSelect.options).forEach(option => {
            option.selected = option.value === 'all';
        });
        
        document.getElementById('school-type').value = 'all';
        document.getElementById('subject-select').value = 'all';
        
        const gradeSelect = document.getElementById('grade-level');
        Array.from(gradeSelect.options).forEach(option => {
            option.selected = option.value === 'all';
        });
        
        document.getElementById('metric-select').value = 'performance';
        document.getElementById('time-range').value = 'current';
        document.getElementById('compare-trend').checked = true;
        document.getElementById('show-projections').checked = false;
        
        // Hide custom range
        document.getElementById('custom-range').style.display = 'none';
        
        // Update filters object
        filters = {
            region: 'all',
            districts: ['all'],
            schoolType: 'all',
            subject: 'all',
            grades: ['all'],
            metric: 'performance',
            timeRange: 'current',
            customRange: { start: 2020, end: 2023 },
            compareTrend: true,
            showProjections: false
        };
        
        // Re-initialize selects
        if (window.districtChoices) window.districtChoices.destroy();
        if (window.gradeChoices) window.gradeChoices.destroy();
        
        const { districtSelect: newDistrictSelect, gradeSelect: newGradeSelect } = initializeSelects();
        window.districtChoices = newDistrictSelect;
        window.gradeChoices = newGradeSelect;
        
        // Apply filters
        applyFilters();
        
        showNotification('Filters reset to default', 'info');
    }
    
    // Show notification
    function showNotification(message, type) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.data-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `data-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
            color: white;
            padding: 12px 20px;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease-out;
        `;
        
        const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Animations are moved to css/style.css to avoid dynamic style injection (safer for scanners).
    }
    
    // Export chart as PNG
    function exportAsPNG() {
        if (!mainChart) return;
        
        const link = document.createElement('a');
        link.download = `EduConnect-Data-${filters.metric}-${new Date().toISOString().slice(0,10)}.png`;
        link.href = mainChart.toBase64Image();
        link.click();
        
        showNotification('Chart exported as PNG', 'success');
    }
    
    // Export data as CSV
    function exportAsCSV() {
        const data = getChartData();
        let csvContent = "data:text/csv;charset=utf-8,";
        
        // Add headers
        csvContent += "District,Value\n";
        
        // Add data rows
        data.labels.forEach((label, index) => {
            const value = data.datasets[0].data[index];
            csvContent += `"${label}",${value}\n`;
        });
        
        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `EduConnect-Data-${filters.metric}-${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Data exported as CSV', 'success');
    }
    
    // Initialize event listeners
    function initEventListeners() {
        // Apply filters button
        document.getElementById('apply-filters').addEventListener('click', applyFilters);
        
        // Reset filters button
        document.getElementById('reset-filters').addEventListener('click', resetFilters);
        
        // Refresh data button
        document.getElementById('refresh-data').addEventListener('click', function() {
            showNotification('Refreshing data from server...', 'info');
            setTimeout(() => {
                applyFilters();
                showNotification('Data refreshed successfully', 'success');
            }, 1000);
        });
        
        // Chart type buttons
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update chart type
                currentChartType = this.getAttribute('data-chart-type');
                
                // Re-initialize chart
                initializeChart();
            });
        });
        
        // Time range change
        document.getElementById('time-range').addEventListener('change', function() {
            const customRange = document.getElementById('custom-range');
            if (this.value === 'custom') {
                customRange.style.display = 'block';
            } else {
                customRange.style.display = 'none';
            }
        });
        
        // Export buttons
        document.getElementById('export-png').addEventListener('click', exportAsPNG);
        document.getElementById('export-csv').addEventListener('click', exportAsCSV);
        
        // PDF export (simulated)
        document.getElementById('export-pdf').addEventListener('click', function() {
            showNotification('PDF export feature coming soon', 'info');
        });
        
        // Excel export (simulated)
        document.getElementById('export-excel').addEventListener('click', function() {
            showNotification('Excel export feature coming soon', 'info');
        });
        
        // Allow Enter key to apply filters in select elements
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applyFilters();
                }
            });
        });
    }
    
    // Initialize the dashboard
    function initDashboard() {
        // Initialize multi-select dropdowns
        const { districtSelect, gradeSelect } = initializeSelects();
        window.districtChoices = districtSelect;
        window.gradeChoices = gradeSelect;
        
        // Set current data
        currentData = datasets.performance;
        
        // Initialize chart
        initializeChart();
        
        // Update UI
        updateChartTitle();
        updateComparisonMetrics();
        populateDataTable();
        
        // Initialize event listeners
        initEventListeners();
        
        // Show welcome message
        setTimeout(() => {
            showNotification('Data dashboard loaded successfully. Use filters to customize your view.', 'success');
        }, 500);
    }
    
    // Initialize when page loads
    initDashboard();
});