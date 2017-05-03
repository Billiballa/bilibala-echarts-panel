import _ from 'lodash';
import { PanelCtrl } from 'app/plugins/sdk';
import echarts from 'vendor/echarts';
// import 'vendor/world';
import 'vendor/china';
import 'vendor/beijing';
import 'vendor/dark';

export class EchartsCtrl extends PanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            EchartsOption: 'option = {}'
        };

        _.defaults(this.panel, panelDefaults);

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
    }

    dataChanged() {
        this.IS_DATA_CHANGED = true;
        this.render();
        this.IS_DATA_CHANGED = false;
    }

    onInitEditMode() {
        this.addEditorTab('EchartsOption', 'public/plugins/grafana-echarts-panel/editor.html', 2);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];
        let option = {};
        
        //init height
        var height = ctrl.height || panel.height || ctrl.row.height;
        if (_.isString(height)) {
            height = parseInt(height.replace('px', ''), 10);
        }
        $panelContainer.style.height = height + 'px';

        //init width
        var width = document.body.clientWidth;
        width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
        $panelContainer.style.width = width + 'px';

        //init echarts
        var myChart = echarts.init($panelContainer, 'dark');

        function render() {
            if (!ctrl.panel.EchartsOption || ctrl.panel.EchartsOption == 'option = {}' ||!myChart) {
                return;
            }
            // console.log(ctrl.panel.EchartsOption);
            myChart.resize();

            if (ctrl.IS_DATA_CHANGED) {
                myChart.clear();
            }

            eval(ctrl.panel.EchartsOption);

            myChart.setOption(option);
        }

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }
}

EchartsCtrl.templateUrl = 'module.html';
