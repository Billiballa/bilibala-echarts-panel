# Grafana Echarts Panel

Echarts panel for grafana 6+, coding with react.

Code editor is attached in the edit panel to configure the option of echarts.

Support [echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud), [echarts-liquidfill](https://github.com/ecomfe/echarts-liquidfill) and [echarts-gl](https://github.com/ecomfe/echarts-gl).

## How Use

1. Clone this repo to "/grafana_path/data/plugins".
2. Restart grafana.

(Map support: Add YourMap.json to **src/map** and run ``yarn build``, panel will auto register it(``echarts.registerMap('YourMap', {...}))``).

## Custom

This plugin build with [@grafana/toolkit](https://www.npmjs.com/package/@grafana/toolkit).

To work with this plugin run:
```
yarn dev
```

or
```
yarn watch
```

This will run linting tools and apply prettier fix.


To build the plugin run:
```
yarn build
```
