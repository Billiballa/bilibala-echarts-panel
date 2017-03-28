# grafana-echarts-panel
Echarts panel for grafana
## How Use
1. Merge **./vendor** folder and **Grafana/public/vendor** folder(You can also download [echarts.js](http://echarts.baidu.com/download.html), [world.js](http://echarts.baidu.com/download-map.html) and [China.js](http://echarts.baidu.com/download-map.html) to **Grafana/public/vendor/** and change `define(['exports', 'echarts'], factory);` to `define(['exports', 'vendor/echarts'], factory);` in dark.js, world.js and china.js.).
2. `$ npm install`
3. `$ grunt`
4. Restart **Grafana-server**.
5. Add your echarts option to **EchartsOption** in edit page.
