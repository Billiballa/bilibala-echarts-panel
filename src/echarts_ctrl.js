import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import echarts from './libs/echarts.min';
import './libs/echarts-liquidfill.min';
import './libs/echarts-wordcloud.min';
import './libs/dark';
import './style.css!';
import './libs/bmap.js';
import './libs/getBmap.js';

export class EchartsCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            EchartsOption: 'console.log(JSON.stringify(echartsData));\n\n option = {};',
            IS_MAP: false,
            map: '',
            USE_URL: false,
            url: '',
            request: '',
            updateInterval: 10000
        };

        this.maps = ['世界', '中国', '北京'];

        _.defaults(this.panel, panelDefaults);

        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-error', this.onDataError.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));

        this.updateData();
    }

    //post请求
    updateData() {
        let that = this, xmlhttp;

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (!JSON.parse(xmlhttp.responseText).success) return;
                that.UrlData = JSON.parse(xmlhttp.responseText).data;
                that.onDataReceived();
            }
        };

        if (that.panel.url && that.panel.request) {
            xmlhttp.open("POST", that.panel.url, true);
            xmlhttp.send(that.panel.request);
        }

        this.$timeout(() => { this.updateData(); }, that.panel.updateInterval);
    }

    onDataReceived(dataList) {
        this.data = this.panel.USE_URL ? this.UrlData : dataList;
        this.IS_DATA_CHANGED = true;
        this.render();
        this.IS_DATA_CHANGED = false;
    }

    onDataError(err) {
        this.render();
    }

    onInitEditMode() {
        this.addEditorTab('Ecahrts配置', 'public/plugins/grafana-echarts-panel/editor.html', 2);
    }

    importMap() {
        if (!this.panel.IS_MAP) return;
        switch (this.panel.map) {
            case '世界':
                System.import(this.getPanelPath() + 'libs/world.js');
                break;
            case '中国':
                System.import(this.getPanelPath() + 'libs/china.js');
                break;
            case '北京':
                System.import(this.getPanelPath() + 'libs/beijing.js');
                break;
            // case '百度地图':
            //     System.import(this.getPanelPath() + 'libs/bmap.js');
            //     System.import(this.getPanelPath() + 'libs/getBmap.js');
            // break;
            default:
                break;
        }
    }

    getPanelPath() {
        // the system loader preprends publib to the url, add a .. to go back one level
        return '../' + grafanaBootData.settings.panels[this.pluginId].baseUrl + '/';
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];
        let option = {},
            echartsData = [];

        ctrl.IS_DATA_CHANGED = true;

        function setHeight() {
            let height = ctrl.height || panel.height || ctrl.row.height;
            if (_.isString(height)) {
                height = parseInt(height.replace('px', ''), 10);
            }
            // height -= 7;
            // height -= ctrl.panel.title ? 25 : 9;
            $panelContainer.style.height = height + 'px';
        }

        // function setWidth() {
        //     let width = document.body.clientWidth;
        //     width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
        //     $panelContainer.style.width = width + 'px';
        // }

        setHeight();
        // setWidth();

        let myChart = echarts.init($panelContainer, 'dark');

        ctrl.importMap();

        // bad hank
        setTimeout(function () {
            myChart.resize();
        }, 1000);

        // 防止重复触发事件
        var callInterval = function callInterval() {
            var timeout, result;

            function func(callBack, interval) {
                var context = this; // jshint ignore:line
                var args = arguments;

                if (timeout) clearInterval(timeout);

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

            setHeight();
            myChart.resize();

            if (ctrl.IS_DATA_CHANGED) {
                myChart.clear();
                echartsData = ctrl.data;

                eval(ctrl.panel.EchartsOption); // jshint ignore:line

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
