import { FieldCMEditor } from 'components/FieldCMEditor';
import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { Field, Switch } from '@grafana/ui';
import MyField from './components/MyField';
import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onChange(key: string, value: any) {
    this.props.onOptionsChange({ ...this.props.options, [key]: value });
  }

  render() {
    const FieldEl = Field || MyField;
    return (
      <>
        <FieldEl
          label="Follow Grafana Theme"
          description="Use default theme or follow theme of grafana (light or dark)."
        >
          <Switch
            checked={this.props.options.followTheme}
            value={this.props.options.followTheme}
            onChange={(e) => this.onChange('followTheme', (e.target as HTMLInputElement).checked)}
          />
        </FieldEl>
        <FieldEl
          label="Echarts Option"
          description="Return options called by echarts or just use echartsInstance.setOption(...)."
        >
          <FieldCMEditor value={this.props.options.getOption} onChange={(v) => this.onChange('getOption', v)} />
        </FieldEl>
      </>
    );
  }
}
