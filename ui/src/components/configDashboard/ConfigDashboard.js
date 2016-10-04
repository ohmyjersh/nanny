import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class ConfigDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    render() {
        const {editorState} = this.state;
        return (
        <div id="content" style={styles.content}>
            <h1>dashboard</h1>
                <div className="editor" style={styles.editor}>
                    <Editor 
                        editorState={editorState} 
                        onChange={this.onChange}
                        blockStyleFn={RichUtils.toggleBlockType(
                            this.state.editorState,
                            'code-block')}/>
                </div>
        </div> );
    }
}

var styles = {
    content: {
        width: '480px',
        margin: '0 auto'
    },
    editor: {
        border: '1px solid grey',
        padding: '6px'
    }
}

export default ConfigDashboard;