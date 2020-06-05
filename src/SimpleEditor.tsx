import React, { PureComponent, RefObject } from 'react';
import { Field, Switch } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { css } from 'emotion';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/seti.css';

import 'codemirror/mode/javascript/javascript';

import 'codemirror/addon/display/autorefresh';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';

import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';

import 'codemirror/addon/selection/active-line.js';
import 'codemirror/keymap/sublime.js';

import 'codemirror/addon/comment/comment.js';

// import 'codemirror/addon/hint/show-hint.css';
// import 'codemirror/addon/hint/show-hint.js';
// import 'codemirror/addon/hint/javascript-hint.js';
import { SimpleOptions, funcParams } from './types';
import MyField from './components/MyField';
import './style.css';

const getStyles = () => ({
  span: css`
    padding: 2px;
    opacity: .6;
    font-size: 12px;
  `,
});

export interface SimpleEditor {
  editorRef: RefObject<HTMLElement> | any;
  cm: CodeMirror.EditorFromTextArea;
  styles: any;
}

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  constructor(props: any) {
    super(props);

    this.editorRef = React.createRef();
    this.styles = getStyles();
  }

  componentDidMount() {
    this.cm = CodeMirror.fromTextArea(this.editorRef.current, {
      autoRefresh: true,

      theme: 'seti',
      mode: 'javascript',
      keyMap: "sublime",

      tabSize: 2,
      smartIndent: true,
      indentUnit: 2,

      lineNumbers: true,
      inputStyle: 'contenteditable',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],

      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,

      extraKeys: {
        'Cmd-/': 'toggleComment',
        'Ctrl-/': 'toggleComment',
      },
    });

    this.cm.on('blur', (cm: any) => {
      this.props.onOptionsChange({ ...this.props.options, getOption: cm.doc.getValue() });
    });

    // bad hack: try to fix display problems when CodeMoirror is initialized
    setTimeout(() => this.cm.refresh(), 300);
  }

  componentWillUnmount() {
    if (this.cm) {
      this.cm.toTextArea();
    }
  }

  onChange(e: React.FormEvent<HTMLInputElement>) {
    this.props.onOptionsChange({ ...this.props.options, followTheme: (e.target as HTMLInputElement).checked });
  };

  render() {
    const FieldEl = Field || MyField;
    return (
      <>
        <FieldEl label="Follow Grafana Theme" description="Use default theme or follow theme of grafana (light or dark).">
          <Switch checked={this.props.options.followTheme} value={this.props.options.followTheme} onChange={(e) => this.onChange(e)} />
        </FieldEl>
        <FieldEl label="Echarts Option" description="Return options called by echarts or just use echartsInstance.setOption(...).">
          <>
            <span className={this.styles.span}>{`function (${funcParams}) {`}</span>
            <textarea ref={this.editorRef} value={this.props.options.getOption} />
            <span className={this.styles.span}>{`}`}</span>
          </>
        </FieldEl>
      </>
    );
  }
}
