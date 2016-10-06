import React from 'react';
import ReactDOM from 'react-dom';
import Draft, {
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
    Decorator,
    convertFromRaw
} from 'draft-js';
var CodeUtils = require('draft-js-code');
const PrismDraftDecorator = require('draft-js-prism')
import Immutable from 'immutable';

class ConfigDashboard extends React.Component {
    constructor(props) {
        super(props);

        var decorator = new PrismDraftDecorator();

        this.state = {
            editorState: EditorState.createWithContent(this._resetState(), decorator),
        };
        this._onChange = this._onChange.bind(this);
        this.focus = () => this.refs.editor.focus();
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.keyBindingFn = (e) => this._keyBindingFn(e);
        this.onTab = (e) => this._onTab(e);
        this.onReturn = (e) => this._onReturn(e);
    }

    _resetState() {
        return convertFromRaw({
            entityMap:{},
            blocks:[
                {
                    type: 'code-block',
                    text: '{\n}'
                },
            ]
        });
    }
    _fromTemplate(e) {
        console.log("template")
        var template = convertFromRaw({
            entityMap:{},
            blocks:[
                {
                    type: 'code-block',
                    text: '{\n"key":"value"\n}'
                },
            ]
        });
        const editorState = EditorState.push(this.state.editorState, template);
        this.setState({ editorState });   
    }
    _handleKeyCommand(command) {
        const {editorState} = this.state;
        let newState;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
            newState = CodeUtils.handleKeyCommand(editorState, command);
        }

        if (!newState) {
            newState = RichUtils.handleKeyCommand(editorState, command);
        }

        if (newState) {
            this._onChange(newState);
            return true;
        }
        return false;
    }

    _keyBindingFn(e) {
        let editorState = this.state.editorState;
        let command;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
            command = CodeUtils.getKeyBinding(e);
        }
        if (command) {
            return command;
        }

        return Draft.getDefaultKeyBinding(e);
    }

    _onTab(e) {
        let editorState = this.state.editorState;

        if (!CodeUtils.hasSelectionInBlock(editorState)) {
            return;
        }

        this._onChange(
            CodeUtils.handleTab(e, editorState)
        )
    }

    _onReturn(e) {
        let editorState = this.state.editorState;

        if (!CodeUtils.hasSelectionInBlock(editorState)) {
            return;
        }

        this._onChange(
            CodeUtils.handleReturn(e, editorState)
        )
        return true;
    }

    _onChange(editorState) {
            // update redux store
            var currentContent = editorState.getCurrentContent();
            if (!currentContent.hasText()) {
                const pushedState = EditorState.push(this.state.editorState, this._resetState());
                Object.assign(editorState,pushedState);
            }
            this.setState({editorState})
        };

    render() {
       var editorState = this.state.editorState
        return (
            <div className="RichEditor-root">
                <div className='RichEditor-editor' onClick={this.focus}>
                    <button onClick={this._fromTemplate.bind(this)}>Template</button>
                    <Editor
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.keyBindingFn}
                        onChange={this._onChange}
                        ref="editor"
                        spellCheck={true}
                        handleReturn={this.onReturn}
                        onTab={this.onTab}
                    />
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 10
    },
};
export default ConfigDashboard;