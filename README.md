# Grafana Echarts Panel

[![Grafana 9](https://img.shields.io/badge/Grafana-9-orange)](https://www.grafana.com)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/VolkovLabs/volkovlabs-echarts-panel.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/VolkovLabs/volkovlabs-echarts-panel/context:javascript)

## Introduction

The Echarts Panel is a plugin for Grafana that supports Apache ECharts, an Open Source JavaScript Visualization Library.

![screenshot](https://github.com/Billiballa/bilibala-echarts-panel/raw/master/src/img/screenshot.png)

### Requirements

- Grafana 8.5+, Grafana 9.0+ is required.

## Getting Started

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

2. Add Map: clone repo, add YourMap.json to **src/map** and run `yarn build`, panel will auto register it(`echarts.registerMap('YourMap', {...}))`.

## Features

- Code editor is attached in the edit panel to configure the option of [Apache ECharts (incubating)](https://github.com/apache/incubator-echarts).
- Supports [echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud), [echarts-liquidfill](https://github.com/ecomfe/echarts-liquidfill) and [echarts-gl](https://github.com/ecomfe/echarts-gl).

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Star the repository to show your support.

## Contributing

- Fork the repository.
- Find an issue to work on and submit a pull request.
- Could not find an issue? Look for documentation, bugs, typos, and missing features.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).
