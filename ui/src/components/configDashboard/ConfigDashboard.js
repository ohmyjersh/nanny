import React from 'react';
import ReactDOM from 'react-dom';
import Draft, {
    Modifier,
    Editor,
    EditorState,
    Entity,
    RichUtils,
    ContentState,
    DefaultDraftBlockRenderMap,
    Decorator,
    convertFromRaw,
    CompositeDecorator,
    AtomicBlockUtils,
    SelectionState
} from 'draft-js';
import {
  getSelectionRange,
  getSelectedBlockElement,
  getSelectionCoords
} from '../utils/selection';
import InlineToolbar from '../components/InlineToolbar';
import CodeUtils from 'draft-js-code';
import PrismDraftDecorator from 'draft-js-prism';
import Immutable from 'immutable';

class ConfigDashboard extends React.Component {
    constructor(props) {
        super(props);

        var decorator = new PrismDraftDecorator();

        this.state = {
            editorState: EditorState.createWithContent(this._resetState(), decorator),
            inlineToolbar: { show: false }
        };
        this._onChange = this._onChange.bind(this);
        this.focus = () => this.refs.editor.focus();
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.keyBindingFn = (e) => this._keyBindingFn(e);
        this.onTab = (e) => this._onTab(e);
        this.onReturn = (e) => this._onReturn(e);
    }

  _updateSelection() {
    const selectionRange = getSelectionRange();
    let selectedBlock;
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange);
    }
    this.setState({
      selectedBlock,
      selectionRange
    });
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
            var text = currentContent.getPlainText();
            console.log(text);
            var jsonObject = currentContent.toJS();
            console.log(JSON.stringify(jsonObject));
            if (!currentContent.hasText()) {
                const pushedState = EditorState.push(this.state.editorState, this._resetState());
                Object.assign(editorState,pushedState);
            }

      if (!editorState.getSelection().isCollapsed()) {
        const selectionRange = getSelectionRange();
        const selectionCoords = getSelectionCoords(selectionRange);
        this.setState({
          inlineToolbar: {
            show: true,
            position: {
              top: selectionCoords.offsetTop,
              left: selectionCoords.offsetLeft
            }
          }
        });
      } else {
        this.setState({ inlineToolbar: { show: false } });
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









// import React, { Component, PropTypes } from 'react';
// import {
//   Modifier,
//   Editor,
//   EditorState,
//   Entity,
//   RichUtils,
//   ContentState,
//   CompositeDecorator,
//   AtomicBlockUtils,
//   SelectionState
// } from 'draft-js';
// import {
//   getSelectionRange,
//   getSelectedBlockElement,
//   getSelectionCoords
// } from '../utils/selection';
// import InlineToolbar from '../components/InlineToolbar';

// class RichEditor extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editorState: EditorState.createEmpty(),
//       inlineToolbar: { show: false }
//     };

//     this.onChange = (editorState) => {
//       if (!editorState.getSelection().isCollapsed()) {
//         const selectionRange = getSelectionRange();
//         const selectionCoords = getSelectionCoords(selectionRange);
//         this.setState({
//           inlineToolbar: {
//             show: true,
//             position: {
//               top: selectionCoords.offsetTop,
//               left: selectionCoords.offsetLeft
//             }
//           }
//         });
//       } else {
//         this.setState({ inlineToolbar: { show: false } });
//       }

//       this.setState({ editorState });
//       setTimeout(this.updateSelection, 0);
//     }
//     this.focus = () => this.refs.editor.focus();
//     this.updateSelection = () => this._updateSelection();
//     this.handleKeyCommand = (command) => this._handleKeyCommand(command);
//     this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
//     this.templateString = (style) => this._templateString(style);
//   }

//   _updateSelection() {
//     const selectionRange = getSelectionRange();
//     let selectedBlock;
//     if (selectionRange) {
//       selectedBlock = getSelectedBlockElement(selectionRange);
//     }
//     this.setState({
//       selectedBlock,
//       selectionRange
//     });
//   }

//   _handleKeyCommand(command) {
//     console.log("command")
//     const { editorState } = this.state;
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }

//   _toggleInlineStyle(inlineStyle) {
//     this.onChange(
//       RichUtils.toggleInlineStyle(
//         this.state.editorState,
//         inlineStyle
//       )
//     );
//   }

//   _templateString(inlineStyle) {
//       let {editorState} = this.state;
//       let content = editorState.getCurrentContent();
//       let selectionState = editorState.getSelection()
//       let start = selectionState.getStartOffset();
//       let end = selectionState.getEndOffset();
//       let key = selectionState.getAnchorKey();
//       let block = editorState.getCurrentContent().getBlockForKey(key);
//       console.log(block);
//       let selectedText = block.getText().slice(start, end);
//       let text = /^(({.+}))$/.test(selectedText) ? selectedText.slice(1, -1) : "{" + selectedText + "}";
//       let replaced = Modifier.replaceText(
//           content,
//           selectionState,
//           text,
//           null
//         );
//       editorState = EditorState.push(
//         editorState,
//         replaced,
//         'replace-text'
//       );
//       this.onChange(editorState);
//   }

//   render() {
//     const { editorState, selectedBlock, selectionRange } = this.state;

//     if (selectedBlock) {
//       const editor = document.getElementById('richEditor');
//       const editorBounds = editor.getBoundingClientRect();
//       const blockBounds = selectedBlock.getBoundingClientRect();
//     }

//     return (
//       <div className="editor" id="richEditor" onClick={this.focus}>
//         {this.state.inlineToolbar.show
//           ? <InlineToolbar
//               editorState={editorState}
//               onToggle={this.templateString}
//               position={this.state.inlineToolbar.position}
//             />
//           : null
//         }
//         <Editor
//           editorState={editorState}
//           handleKeyCommand={this.handleKeyCommand}
//           onChange={this.onChange}
//           placeholder="Write something..."
//           spellCheck={true}
//           readOnly={this.state.editingImage}
//           ref="editor"
//         />
//       </div>
//     );
//   }
// }

// export default RichEditor;

