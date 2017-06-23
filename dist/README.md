# grafana-echarts-panel
Echarts panel for grafana
## How Use
1. `$ npm install`
2. `$ grunt`
3. Restart **Grafana-server**.
4. Add a echarts panel.
5. Add your echarts option to **EchartsOption** in edit page.
## Tips
1. Support **liquidfill** and **wordcloud** plugin.
2. You can import other map ,just copy it to **libs** folder and import it in **echarts_ctrl.js**.
3. **dark.js** is the theme file ,If you want to customize theme.
4. Response belongs to your url has been saved as **echartsData**.
5. Calling the timer function as the callback of **callInterval(callBack, interval)** function prevents it from being repeatedly triggered.
