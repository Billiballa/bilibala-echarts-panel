'use strict';

System.register(['app/plugins/sdk', 'lodash', './libs/echarts.min', './libs/echarts-liquidfill.min', './libs/echarts-wordcloud.min', './libs/dark', './libs/china', './libs/beijing', './style.css!'], function (_export, _context) {
    "use strict";

    var PanelCtrl, _, echarts, _createClass, EchartsCtrl;

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
            PanelCtrl = _appPluginsSdk.PanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_libsEchartsMin) {
            echarts = _libsEchartsMin.default;
        }, function (_libsEchartsLiquidfillMin) {}, function (_libsEchartsWordcloudMin) {}, function (_libsDark) {}, function (_libsChina) {}, function (_libsBeijing) {}, function (_styleCss) {}],
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

            _export('EchartsCtrl', EchartsCtrl = function (_PanelCtrl) {
                _inherits(EchartsCtrl, _PanelCtrl);

                function EchartsCtrl($scope, $injector) {
                    _classCallCheck(this, EchartsCtrl);

                    var _this = _possibleConstructorReturn(this, (EchartsCtrl.__proto__ || Object.getPrototypeOf(EchartsCtrl)).call(this, $scope, $injector));

                    var panelDefaults = {
                        EchartsOption: 'console.log(JSON.stringify(echartsData)); \n option = {};',
                        valueMaps: [],
                        sensors: [],
                        url: '',
                        request: '',
                        updateInterval: 10000
                    };

                    _.defaults(_this.panel, panelDefaults);
                    _.defaults(_this.panel.EchartsOption, panelDefaults.EchartsOption);

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('panel-initialized', _this.render.bind(_this));

                    _this.updateClock();
                    return _this;
                }

                //post请求


                _createClass(EchartsCtrl, [{
                    key: 'updateClock',
                    value: function updateClock() {
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
                                that.data = JSON.parse(xmlhttp.responseText).data;
                                that.dataChanged();
                            }
                        };

                        if (that.panel.url && that.panel.request) {
                            xmlhttp.open("POST", that.panel.url, true);
                            xmlhttp.send(that.panel.request);
                        }

                        this.$timeout(function () {
                            _this2.updateClock();
                        }, that.panel.updateInterval);
                    }
                }, {
                    key: 'dataChanged',
                    value: function dataChanged() {
                        this.IS_DATA_CHANGED = true;
                        this.render();
                        this.IS_DATA_CHANGED = false;
                    }
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/grafana-echarts-panel/editor.html', 2);
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        var $panelContainer = elem.find('.echarts_container')[0];
                        var option = {},
                            echartsData = [];

                        ctrl.IS_DATA_CHANGED = true;

                        //init height
                        var height = ctrl.height || panel.height || ctrl.row.height;
                        if (_.isString(height)) {
                            height = parseInt(height.replace('px', ''), 10);
                        }
                        height -= 5;
                        height -= ctrl.panel.title ? 24 : 9;
                        $panelContainer.style.height = height + 'px';

                        //init width
                        var width = document.body.clientWidth;
                        width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
                        $panelContainer.style.width = width + 'px';

                        //init echarts
                        var myChart = echarts.init($panelContainer, 'dark');

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
                }]);

                return EchartsCtrl;
            }(PanelCtrl));

            _export('EchartsCtrl', EchartsCtrl);

            EchartsCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=echarts_ctrl.js.map
