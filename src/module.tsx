import { PanelPlugin } from '@grafana/data';
import { EchartsPanel } from './components/EchartsPanel/EchartsPanel';
import { FieldCMEditor } from './components/FieldCMEditor';
import { defaults, PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EchartsPanel).setPanelOptions((builder) => {
  builder
    .addBooleanSwitch({
      path: 'followTheme',
      name: 'Follow Grafana Theme',
      description: 'Use default theme or follow theme of grafana (light or dark).',
      defaultValue: defaults.followTheme,
    })
    .addCustomEditor({
      id: 'getOption',
      path: 'getOption',
      name: 'Echarts options',
      description: 'Return options called by echarts or just use echartsInstance.setOption(...).',
      defaultValue: defaults.getOption,
      editor: FieldCMEditor,
    });

  return builder;
});
