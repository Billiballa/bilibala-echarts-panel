import React, { PureComponent, RefObject } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

import { debounce } from 'lodash';
import echarts from 'echarts';
import 'echarts-wordcloud';
import 'echarts-liquidfill';

interface Props extends PanelProps<SimpleOptions> {}

export interface SimplePanel {
  echartRef: RefObject<HTMLElement> | any;
  chart: echarts.ECharts;
  getOption: Function;
}

export class SimplePanel extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
    this.echartRef = React.createRef();
  }

  resetOption = debounce(
    isGenGetOption => {
      try {
        if (isGenGetOption) {
          this.getOption = new Function('data', this.props.options.getOption);
        }
        this.chart.clear();
        this.chart.setOption(this.getOption(this.props.data));
      } catch (err) {
        console.log('Editor content error!');
        throw err;
      }
    },
    150,
    { leading: true }
  );

  componentDidMount() {
    this.chart = echarts.init(this.echartRef.current);
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
    return <div ref={this.echartRef} style={{ height: '100%' }}></div>;
  }
}
