import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import echarts from 'vendor/echarts';

export class EchartsCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const dataStyle = {
            normal: {
                label: { show: false },
                labelLine: { show: false },
                shadowBlur: 40,
                shadowColor: 'rgba(40, 40, 40, 0.5)',
            }
        };
        const placeHolderStyle = {
            normal: {
                label: { show: false },
                labelLine: { show: false }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        const panelDefaults = {
            options: {
                color: ['#85b6b2', '#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
                tooltip: {
                    show: true,
                    formatter: "{a} <br/>{b} : {c}TB ({d}%)"
                },
                legend: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    }
                },
                series: [{
                    name: '全部存储',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: ["50%", "60%"],
                    itemStyle: dataStyle,
                    data: [{
                        value: 975,
                        name: '已用总量'
                    }, {
                        value: 535,
                        name: '剩余',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '端口占用',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: ["40%", "50%"],
                    itemStyle: dataStyle,
                    data: [{
                        value: 1673,
                        name: '已用端口'
                    }, {
                        value: 797,
                        name: '剩余',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '主机存储',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: ["30%", "40%"],
                    itemStyle: dataStyle,
                    data: [{
                        value: 367,
                        name: '已用存储'
                    }, {
                        value: 266,
                        name: '剩余',
                        itemStyle: placeHolderStyle
                    }]
                }]
            }
        };

        _.defaults(this.panel, panelDefaults);

        console.log(this.panel.options);

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        // console.log(dataList);
    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/grafana-demo-panel/editor.html', 2);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];

        console.log(elem.clientWidth);

        $panelContainer.style.width = $panelContainer.parentNode.parentNode.clientWidth + 'px';
        $panelContainer.style.height = $panelContainer.parentNode.parentNode.clientHeight + 'px';

        let myChart = echarts.init($panelContainer);

        function render() {
            // if (!ctrl.panel.option) {
            //     return; }
            myChart.resize();
            myChart.setOption(ctrl.panel.options);
            console.log(ctrl.panel.options);
        }

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }
}

EchartsCtrl.templateUrl = 'module.html';
