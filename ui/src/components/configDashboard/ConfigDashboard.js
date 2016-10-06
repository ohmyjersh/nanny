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
// import Immutable from 'immutable';
// const {Map, List} = Immutable;

var emptyState = convertFromRaw({
    entityMap:{},
    blocks:[
        {
            type: 'code-block',
            text: '{\n"key":"value"\n}'
        },
    ]
})

class ConfigDashboard extends React.Component {
    constructor(props) {
        super(props);

        var decorator = new PrismDraftDecorator();

        this.state = {
            editorState: EditorState.createWithContent(emptyState, decorator),
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) =>  {
            var currentContent = editorState.getCurrentContent();
            if (!currentContent.hasText()) {
                const editorState = EditorState.push(this.state.editorState, emptyState);
                this.setState({ editorState });  
            }
            else {
                this.setState({editorState})
            }
        };

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.keyBindingFn = (e) => this._keyBindingFn(e);
        this.onTab = (e) => this._onTab(e);
        this.onReturn = (e) => this._onReturn(e);
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
            this.onChange(newState);
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

        this.onChange(
            CodeUtils.handleTab(e, editorState)
        )
    }

    _onReturn(e) {
        let editorState = this.state.editorState;

        if (!CodeUtils.hasSelectionInBlock(editorState)) {
            return;
        }

        this.onChange(
            CodeUtils.handleReturn(e, editorState)
        )
        return true;
    }

    render() {
        return (
            <div className="RichEditor-root">
                <div className='RichEditor-editor' onClick={this.focus}>
                    <Editor
                        customStyleMap={styleMap}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.keyBindingFn}
                        onChange={this.onChange}
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