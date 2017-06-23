import { PanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import echarts from './libs/echarts.min';
import './libs/echarts-liquidfill.min';
import './libs/echarts-wordcloud.min';
import './libs/dark';
import './libs/china';
import './libs/beijing';
import './style.css!';

export class EchartsCtrl extends PanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            EchartsOption: 'console.log(JSON.stringify(echartsData)); \n option = {};',
            valueMaps: [],
            sensors: [],
            url: '',
            request: '',
            updateInterval: 10000
        };

        _.defaults(this.panel, panelDefaults);
        _.defaults(this.panel.EchartsOption, panelDefaults.EchartsOption);

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));

        this.updateClock();
    }

    //post请求
    updateClock() {
        let that = this, xmlhttp;

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (!JSON.parse(xmlhttp.responseText).success) return;
                that.data = JSON.parse(xmlhttp.responseText).data;
                that.dataChanged();
            }
        };

        if (that.panel.url && that.panel.request) {
            xmlhttp.open("POST", that.panel.url, true);
            xmlhttp.send(that.panel.request);
        }

        this.$timeout(() => { this.updateClock(); }, that.panel.updateInterval);
    }

    dataChanged() {
        this.IS_DATA_CHANGED = true;
        this.render();
        this.IS_DATA_CHANGED = false;
    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/grafana-echarts-panel/editor.html', 2);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];
        let option = {},
            echartsData = [];

        ctrl.IS_DATA_CHANGED = true;

        //init height
        let height = ctrl.height || panel.height || ctrl.row.height;
        if (_.isString(height)) {
            height = parseInt(height.replace('px', ''), 10);
        }
        height -= 5;
        height -= ctrl.panel.title ? 24 : 9;
        $panelContainer.style.height = height + 'px';

        //init width
        let width = document.body.clientWidth;
        width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
        $panelContainer.style.width = width + 'px';

        //init echarts
        let myChart = echarts.init($panelContainer, 'dark');

        //替代eval
        // function evil(fn) {
        //     var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
        //     return new Fn('return ' + fn)();
        // }

        // 计时器容器，防止重复触发计时事件
        var callInterval = function () {
            var timeout, result;

            function func(callBack, interval) {
                var context = this; // jshint ignore:line
                var args = arguments;

                if (timeout) clearTimeout(timeout);

                timeout = setInterval(function () {
                    result = callBack.apply(context, args);
                }, interval);

                return result;
            }

            return func;
        }();

        function render() {
            if (!myChart) {
                return;
            }
            myChart.resize();

            if (ctrl.IS_DATA_CHANGED) {
                myChart.clear();
                echartsData = ctrl.data;

                eval(ctrl.panel.EchartsOption); // jshint ignore:line
                // evil(ctrl.panel.EchartsOption);

                myChart.setOption(option);
            }
        }

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }
}

EchartsCtrl.templateUrl = 'module.html';
