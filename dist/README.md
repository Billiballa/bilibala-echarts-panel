# Grafana Echarts Panel

Echarts panel for grafana 6+ & 7+, coding with react.

Code editor is attached in the edit panel to configure the option of echarts.

Support [echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud), [echarts-liquidfill](https://github.com/ecomfe/echarts-liquidfill) and [echarts-gl](https://github.com/ecomfe/echarts-gl).

![image](https://github.com/Billiballa/grafana-echarts/blob/master/doc/screenshot.png)

## How Use

1. Clone this repo to "/grafana_path/data/plugins".
2. Restart grafana.

(Map support: Add YourMap.json to **src/map** and run ``yarn build``, panel will auto register it(``echarts.registerMap('YourMap', {...}))``).

## Custom

This plugin build with [@grafana/toolkit](https://www.npmjs.com/package/@grafana/toolkit).

1. Install dependencies
```BASH
yarn install
```
2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

## Learn more
- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
