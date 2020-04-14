import React, { PureComponent, RefObject } from 'react';
import { PanelProps, GrafanaTheme } from '@grafana/data';
import { SimpleOptions } from 'types';
import { withTheme } from '@grafana/ui';

import { debounce } from 'lodash';
import echarts from 'echarts';

// just comment it if don't need it
import 'echarts-wordcloud';
import 'echarts-liquidfill';
import 'echarts-gl';

// auto register map
const maps = (require as any).context('./map', false, /\.json/);
maps.keys().map((m: string) => {
  const matched = m.match(/\.\/([0-9a-zA-Z_]*)\.json/);
  if (matched) {
    echarts.registerMap(matched[1], maps(m));
  } else {
    console.error("Can't register map: JSON file Should be named according to the following rules: /([0-9a-zA-Z_]*).json/.");
  }
});

interface Props extends PanelProps<SimpleOptions> {
  theme: GrafanaTheme;
}

export interface PartialSimplePanel {
  echartRef: RefObject<HTMLElement> | any;
  chart: echarts.ECharts;
  getOption: Function;
}

export class PartialSimplePanel extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.echartRef = React.createRef();
  }

  resetOption = debounce(
    async isGenGetOption => {
      try {
        if (isGenGetOption) {
          this.getOption = new Function('data, theme, echartsInstance', this.props.options.getOption);
        }
        this.chart.clear();
        const options = this.getOption(this.props.data, this.props.theme, this.chart);
        options && this.chart.setOption(options);
      } catch (err) {
        console.log('Editor content error!');
        throw err;
      }
    },
    150,
    { leading: true }
  );

  componentDidMount() {
    this.chart = echarts.init(this.echartRef.current, this.props.theme.type);
    this.resetOption(true);
  }

  componentDidUpdate(preProps: any) {
    this.chart.resize();
    const isGenGetOption = preProps.options.getOption !== this.props.options.getOption;
    this.resetOption(isGenGetOption);
  }

  componentWillUnmount() {
    this.chart.dispose();
  }

  render() {
    const { width, height } = this.props;
    return <div ref={this.echartRef} style={{ position: 'relative', width, height }}></div>;
  }
}

export const SimplePanel = withTheme(PartialSimplePanel);
