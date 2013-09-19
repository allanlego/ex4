Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        this.getData();
    },
    getData: function() {
        // TODO: wsapi data store; on load, aggregate data
    
    
        // Filters
        var filter = Ext.create('Rally.data.QueryFilter', {
            property: 'ScheduleState',
            operator: '=',
            value: 'Defined'
        }).or(Ext.create('Rally.data.QueryFilter', {
            property: 'ScheduleState',
            operator: '=',
            value: 'In-Progress'
        })).or(Ext.create('Rally.data.QueryFilter', {
            property: 'ScheduleState',
            operator: '=',
            value: 'Completed'
        })).or(Ext.create('Rally.data.QueryFilter', {
            property: 'ScheduleState',
            operator: '=',
            value: 'Accepted'
        }));
        
        var records = Ext.create('Rally.data.WsapiDataStore', {
            model: "User Story",
            autoLoad: true,
            fetch: true,
            filters: filter,
            sorters: [
                {
                    property: 'FormattedID',
                    direction: 'ASC'
                }
            ],
            listeners: { 
                load: this.aggregateData,
                scope: this                        
            }
        });
    },
    aggregateData: function(store, data) {
        // TODO: bucket stories by schedule state; render chart
    
        // Initial bucket
        var mockData = {
            'backlog': 0, 
            'inprogress': 0, 
            'completed': 0, 
            'accepted': 0
        };
    
    
        // Iterate through records and update bucket
        Ext.Array.each(data, function(record) {
                if (record.get("ScheduleState") == "In-Progress") {
                    mockData.inprogress++;
                } else if (record.get("ScheduleState") == "Completed") {
                    mockData.completed++;
                } else if (record.get("ScheduleState") == "Accepted") {
                    mockData.accepted++;
                } else {
                    //WTF?
                    console.log(record.get("ScheduleState"));
                    mockData.backlog++;
                }
        });
        
        
        
        this.renderChart(mockData);
    },
    renderChart: function(myData) {
        var myChartConfig = {
            chart: {
                width: "500",
                height: "500",
                type: 'column'
            },
            title: {
                text: 'User Stories'
            },
            subtitle: {
                text: 'Count by Schedule State'
            },
            xAxis: {
                categories: [
                    'User Stories'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Count'
                }
            },
            tooltip: {
                headerFormat: '<table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: false,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
        };
        
        var myChartData = {
            series: [{
                name: 'Backlog',
                data: [myData.backlog]
            },{
                name: 'In-Progress',
                data: [myData.inprogress]
            }, {
                name: 'Completed',
                data: [myData.completed]
            }, {
                name: 'Accepted',
                data: [myData.accepted]
            },]
        };

        var myChart = Ext.create('Rally.ui.chart.Chart', {
            chartConfig: myChartConfig,
            chartData: myChartData,
            chartColors: ['#cccccc', '#c1c1c1', '#3453412', '#123456']
        });
        
        this.add(myChart);
    }
});
