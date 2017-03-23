# grafana-echarts-panel
Echarts panel for grafana
## How Use
1. Download [echarts.js](http://echarts.baidu.com/download.html) to **Grafana/public/vendor/echarts.js**.
2. Download [world.js](http://echarts.baidu.com/download-map.html) to **Grafana/public/vendor/world.js** and change `define(['exports', 'echarts'], factory);` to `define(['exports', 'vendor/echarts'], factory);` in world.js.
3. (You can also remove **vendor** folder to **Grafana/public**)
4. `$ npm install`
5. `$ grunt`
6. Restart **Grafana-server**.
7. Add your echarts option to **EchartsOption** in edit page.
