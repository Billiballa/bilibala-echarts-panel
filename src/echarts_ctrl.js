import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import echarts from 'vendor/echarts';
import 'vendor/world';

export class EchartsCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            EchartsOption: '{}'
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

        let myChart = echarts.init($panelContainer);

        function render() {
            if (!ctrl.panel.EchartsOption || ctrl.panel.EchartsOption == "{}") {
                return;
            }
            // console.log(ctrl.panel.EchartsOption);
            myChart.resize();

            myChart.setOption(eval("(" + ctrl.panel.EchartsOption + ")"));
            
            // myChart.setOption(JSON.parse(ctrl.panel.EchartsOption));
        }
        setTimeout(myChart.resize, 300);

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }
}

EchartsCtrl.templateUrl = 'module.html';
