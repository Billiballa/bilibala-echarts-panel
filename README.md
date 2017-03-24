# grafana-echarts-panel
Echarts panel for grafana
## How Use
1. Download [echarts.js](http://echarts.baidu.com/download.html) to **Grafana/public/vendor/echarts.js**.
2. Merge **./vendor** folder and **Grafana/public/vendor** folder(You can also download [world.js](http://echarts.baidu.com/download-map.html) and  [China.js](http://echarts.baidu.com/download-map.html) to **Grafana/public/vendor/** and change `define(['exports', 'echarts'], factory);` to `define(['exports', 'vendor/echarts'], factory);` in world.js and china.js.).
3. `$ npm install`
4. `$ grunt`
5. Restart **Grafana-server**.
6. Add your echarts option to **EchartsOption** in edit page.
