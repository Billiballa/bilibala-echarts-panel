import React, { PureComponent, RefObject } from 'react';
import { PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import { SimpleOptions } from './types';
import './style.css';

export interface SimpleEditor {
  editorRef: RefObject<HTMLElement> | any;
  cm: CodeMirror.EditorFromTextArea;
}

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  constructor(props: any) {
    super(props);

    this.editorRef = React.createRef();
  }

  componentDidMount() {
    this.cm = CodeMirror.fromTextArea(this.editorRef.current, {
      theme: 'darcula',
      mode: 'javascript',
      tabSize: 2,
    });

    this.cm.on('blur', (cm: any) => {
      this.props.onOptionsChange({ ...this.props.options, getOption: cm.doc.getValue() });
    });

    // bad hack: try to fix Fix display problems when CodeMoirror is initialized
    setTimeout(() => this.cm.refresh(), 0);
  }

  componentWillUnmount() {
    if (this.cm) {
      this.cm.toTextArea();
    }
  }

  render() {
    const funcStart = 'function (data) {';
    const funcEnd = '}';
    return (
      <PanelOptionsGroup title="Echarts Option">
        <p style={{ opacity: '0.5' }}>// This function should return the options called by echarts.setOption</p>
        <h5>{funcStart}</h5>
        <textarea ref={this.editorRef} value={this.props.options.getOption} />
        <h5>{funcEnd}</h5>
      </PanelOptionsGroup>
    );
  }
}
