'use strict';

System.register(['app/plugins/sdk', 'lodash', './libs/echarts.min', './libs/echarts-liquidfill.min', './libs/echarts-wordcloud.min', './libs/dark', './style.css!', './libs/bmap.js', './libs/getBmap.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, echarts, _createClass, EchartsCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_libsEchartsMin) {
            echarts = _libsEchartsMin.default;
        }, function (_libsEchartsLiquidfillMin) {}, function (_libsEchartsWordcloudMin) {}, function (_libsDark) {}, function (_styleCss) {}, function (_libsBmapJs) {}, function (_libsGetBmapJs) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('EchartsCtrl', EchartsCtrl = function (_MetricsPanelCtrl) {
                _inherits(EchartsCtrl, _MetricsPanelCtrl);

                function EchartsCtrl($scope, $injector) {
                    _classCallCheck(this, EchartsCtrl);

                    var _this = _possibleConstructorReturn(this, (EchartsCtrl.__proto__ || Object.getPrototypeOf(EchartsCtrl)).call(this, $scope, $injector));

                    var panelDefaults = {
                        EchartsOption: 'console.log(JSON.stringify(echartsData));\n\n option = {};',
                        IS_MAP: false,
                        map: '',
                        USE_URL: false,
                        url: '',
                        request: '',
                        updateInterval: 10000
                    };

                    _this.maps = ['世界', '中国', '北京'];

                    _.defaults(_this.panel, panelDefaults);

                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('panel-initialized', _this.render.bind(_this));

                    _this.updateData();
                    return _this;
                }

                //post请求


                _createClass(EchartsCtrl, [{
                    key: 'updateData',
                    value: function updateData() {
                        var _this2 = this;

                        var that = this,
                            xmlhttp = void 0;

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

                        this.$timeout(function () {
                            _this2.updateData();
                        }, that.panel.updateInterval);
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        this.data = this.panel.USE_URL ? this.UrlData : dataList;
                        this.IS_DATA_CHANGED = true;
                        this.render();
                        this.IS_DATA_CHANGED = false;
                    }
                }, {
                    key: 'onDataError',
                    value: function onDataError(err) {
                        this.render();
                    }
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Ecahrts配置', 'public/plugins/grafana-echarts-panel/editor.html', 2);
                    }
                }, {
                    key: 'importMap',
                    value: function importMap() {
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
                }, {
                    key: 'getPanelPath',
                    value: function getPanelPath() {
                        // the system loader preprends publib to the url, add a .. to go back one level
                        return '../' + grafanaBootData.settings.panels[this.pluginId].baseUrl + '/';
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        var $panelContainer = elem.find('.echarts_container')[0];
                        var option = {},
                            echartsData = [];

                        ctrl.IS_DATA_CHANGED = true;

                        function setHeight() {
                            var height = ctrl.height || panel.height || ctrl.row.height;
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

                        var myChart = echarts.init($panelContainer, 'dark');

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
                }]);

                return EchartsCtrl;
            }(MetricsPanelCtrl));

            _export('EchartsCtrl', EchartsCtrl);

            EchartsCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=echarts_ctrl.js.map
