import './style.css';
import { PanelPlugin } from '@grafana/data';
// @ts-ignore
import { PanelPlugin as OldPanelPlugin } from '@grafana/ui';
import { FieldCMEditor } from './components/FieldCMEditor';
import { SimpleEditor } from './SimpleEditor';
import { SimplePanel } from './SimplePanel';
import { defaults, SimpleOptions } from './types';

let plugin;

if (!PanelPlugin) {
  // Grafana V6
  plugin = new OldPanelPlugin<SimpleOptions>(SimplePanel).setDefaults(defaults).setEditor(SimpleEditor);
} else {
  // Grafana V7
  plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
    return builder
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
  });
}

export { plugin };
