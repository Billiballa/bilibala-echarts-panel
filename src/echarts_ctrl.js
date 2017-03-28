import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import echarts from 'vendor/echarts';
import 'vendor/world';
import 'vendor/china';
import 'vendor/dark';

export class EchartsCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            EchartsOption: 'option = {}'
        };

        _.defaults(this.panel, panelDefaults);

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        // console.log(dataList);
    }

    onInitEditMode() {
        this.addEditorTab('EchartsOption', 'public/plugins/grafana-echarts-panel/editor.html', 2);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];

        let myChart;
        let option = {};
        
        function initEchart(){
            clearTimeout(Timer);
            if($panelContainer.clientHeight){
                myChart = echarts.init($panelContainer,'dark');
            }else{
                var Timer = setTimeout(initEchart, 100);
            }
        };

        initEchart();

        function render() {
            if (!ctrl.panel.EchartsOption || ctrl.panel.EchartsOption == 'option = {}' ||!myChart) {
                return;
            }
            // console.log(ctrl.panel.EchartsOption);
            myChart.resize();

            eval(ctrl.panel.EchartsOption);

            myChart.setOption(option);
            
            // myChart.setOption(JSON.parse(ctrl.panel.EchartsOption));
        }

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }
}

EchartsCtrl.templateUrl = 'module.html';
