# Grafana Echarts Panel

![release](https://img.shields.io/github/v/release/Billiballa/bilibala-echarts-panel)
![issues](https://img.shields.io/github/issues-closed/Billiballa/bilibala-echarts-panel)
![stars](https://img.shields.io/github/stars/Billiballa/bilibala-echarts-panel?style=social)

Echarts panel for grafana 6.3+ & 7.0+, coding with react.

Code editor is attached in the edit panel to configure the option of [Apache ECharts (incubating)](https://github.com/apache/incubator-echarts).

Support [echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud), [echarts-liquidfill](https://github.com/ecomfe/echarts-liquidfill) and [echarts-gl](https://github.com/ecomfe/echarts-gl).

![screenshot](https://github.com/Billiballa/bilibala-echarts-panel/raw/master/src/img/screenshot.png)

## How Use

1. Download the packaged [plugin](https://github.com/Billiballa/bilibala-echarts-panel/releases).
2. Or clone this repo and run ``yarn build``.
3. Move folder to "/grafana_path/data/plugins".
3. Restart grafana.

## Tips

1. Echarts option in the edit panel will execute when the data from grafana is refreshed, so you should avoid side effects or ensure that the side effects of the last execution can be cleared.
```
function (data, theme, echartsInstance, echarts) {
  echartsInstance.off('click') // clear side effects
  echartsInstance.on('click', () => {
    console.log('Click!');
  })
  return {...}
}
```
2. Add Map: clone repo, add YourMap.json to **src/map** and run ``yarn build``, panel will auto register it(``echarts.registerMap('YourMap', {...}))``.

## Custom

This plugin build with [@grafana/toolkit](https://www.npmjs.com/package/@grafana/toolkit).
For more information about panels, refer to the documentation on [Panels](https://grafana.com/docs/grafana/latest/features/panels/panels/)

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
