import { MetricsPanelCtrl } from 'app/plugins/sdk'; // eslint-disable-line
import _ from 'lodash';
import echarts from './libs/echarts.min'; // eslint-disable-line
import './libs/echarts-liquidfill.min'; // eslint-disable-line
import './libs/echarts-wordcloud.min'; // eslint-disable-line
import './libs/dark'; // eslint-disable-line
import './css/style.css!'; // eslint-disable-line
import './libs/bmap.js'; // eslint-disable-line
import './libs/getBmap.js'; // eslint-disable-line

export class EchartsCtrl extends MetricsPanelCtrl { // eslint-disable-line

  constructor($scope, $injector) {
    super($scope, $injector);

    const panelDefaults = {
      EchartsOption: 'console.log(JSON.stringify(echartsData));\n\noption = {};',
      IS_MAP: false,
      map: '',
      USE_URL: false,
      USE_FAKE_DATA: true,
      fakeData: '',
      url: '',
      request: '',
      updateInterval: 10000,
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

  // post请求
  updateData() {
    const that = this;
    let xmlhttp;

    if (this.panel.USE_URL && this.panel.USE_FAKE_DATA && this.panel.fakeData) {
      this.data = eval(this.panel.fakeData);
    } else

    if (that.panel.USE_URL && !that.panel.USE_FAKE_DATA && that.panel.url && that.panel.request) {
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
      }

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          that.UrlData = JSON.parse(xmlhttp.responseText);
          that.onDataReceived();
        }
      };

      xmlhttp.open('POST', that.panel.url, true);
      xmlhttp.send(that.panel.request);
    } else {
      xmlhttp = null;
    }

    this.$timeout(() => { this.updateData(); }, that.panel.updateInterval);
  }

  onDataReceived(dataList) {
    this.data = !this.panel.USE_URL && !this.panel.USE_FAKE_DATA ? dataList : this.data;

    this.IS_DATA_CHANGED = true;
    this.render();
    this.IS_DATA_CHANGED = false;
  }

  onDataError() {
    this.render();
  }

  onInitEditMode() {
    this.addEditorTab('数据', 'public/plugins/dxc-echarts-panel/partials/editer-metric.html', 2);
    this.addEditorTab('Ecahrts配置', 'public/plugins/dxc-echarts-panel/partials/editor-echarts.html', 3);
  }

  importMap() {
    if (!this.panel.IS_MAP) return;
    switch (this.panel.map) {
      case '世界':
        System.import(this.getPanelPath() + 'libs/world.js'); // eslint-disable-line
        break;
      case '中国':
        System.import(this.getPanelPath() + 'libs/china.js'); // eslint-disable-line
        break;
      case '北京':
        System.import(this.getPanelPath() + 'libs/beijing.js'); // eslint-disable-line
        break;
      // case '百度地图':
      //   System.import(this.getPanelPath() + 'libs/bmap.js');
      //   System.import(this.getPanelPath() + 'libs/getBmap.js');
      // break;
      default:
        break;
    }
  }

  getPanelPath() {
    // the system loader preprends publib to the url, add a .. to go back one level
    return `../${grafanaBootData.settings.panels[this.pluginId].baseUrl}/`; // eslint-disable-line
  }

  link(scope, elem, attrs, ctrl) {
    const $panelContainer = elem.find('.echarts_container')[0];
    let option = {}; // eslint-disable-line
    let echartsData = []; // eslint-disable-line

    ctrl.IS_DATA_CHANGED = true;

    // function setHeight() {
    //   let height = ctrl.height || panel.height || ctrl.row.height;
    //   if (_.isString(height)) {
    //     height = parseInt(height.replace('px', ''), 10);
    //   }
    //   // height -= 7;
    //   // height -= ctrl.panel.title ? 25 : 9;
    //   $panelContainer.style.height = height + 'px';
    // }

    // // function setWidth() {
    // //   let width = document.body.clientWidth;
    // //   width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
    // //   $panelContainer.style.width = width + 'px';
    // // }

    // setHeight();
    // // setWidth();

    const myChart = echarts.init($panelContainer, 'dark');

    ctrl.importMap();

    // bad hank
    setTimeout(() => {
      myChart.resize();
    }, 1000);

    function render() {
      if (!myChart) {
        return;
      }

      if (ctrl.IS_DATA_CHANGED) {
        myChart.clear();
        echartsData = ctrl.data;

        eval(ctrl.panel.EchartsOption);

        myChart.setOption(option);
      }

      myChart.resize();
    }

    this.events.on('render', () => {
      render();
      ctrl.renderingCompleted();
    });
  }
}

EchartsCtrl.templateUrl = 'module.html';
