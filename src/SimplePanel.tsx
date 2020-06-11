import React, { useRef, useState, useEffect } from 'react';
import { PanelProps, GrafanaTheme } from '@grafana/data';
import { withTheme } from '@grafana/ui';
import { debounce } from 'lodash';
import echarts from 'echarts';
import { css, cx } from 'emotion';
import { SimpleOptions, funcParams } from 'types';

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
    console.warn("Can't register map: JSON file Should be named according to the following rules: /([0-9a-zA-Z_]*).json/.");
  }
});

const getStyles = () => ({
  wrapper: css`
    position: relative;
  `,
});

interface Props extends PanelProps<SimpleOptions> {
  theme: GrafanaTheme;
}

const PartialSimplePanel: React.FC<Props> = ({ options, data, width, height, theme }) => {
  const styles = getStyles();
  const echartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  const resetOption = debounce(
    () => {
      if (!chart) { return; }
      if (data.state && data.state !== "Done") { return; }
      try {
        chart.clear();
        let getOption = new Function(funcParams, options.getOption);
        const o = getOption(data, theme, chart, echarts);
        o && chart.setOption(o);
      } catch (err) {
        console.error('Editor content error!', err);
      }
    },
    150,
    { leading: true }
  );

  useEffect(() => {
    if (echartRef.current) {
      chart?.clear();
      chart?.dispose();
      setChart(echarts.init(echartRef.current, options.followTheme ? theme.type : undefined));
    }

    return () => {
      chart?.clear();
      chart?.dispose();
    };
  }, [echartRef.current, options.followTheme]);

  useEffect(() => {
    chart?.resize();
  }, [width, height]);

  useEffect(() => {
    chart && resetOption();
  }, [chart, options.getOption, data]);

  return (
    <div
      ref={echartRef}
      className={cx(
        styles.wrapper,
        css`
        width: ${width}px;
        height: ${height}px;
      `
      )}
    />
  );
}

export const SimplePanel = withTheme(PartialSimplePanel);
