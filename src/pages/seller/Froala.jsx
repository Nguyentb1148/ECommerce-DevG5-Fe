import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';

export default function Froala() {
    const handleEditorChange = (content) => {
        console.log('Editor content:', content);
    };

    const handleButtonClick = () => {
        const editorContent = document.querySelector('.fr-view').innerHTML; // Accessing the editor content
        handleEditorChange(editorContent); // Logging content when button is clicked
    };

    return (
        <div>
            <FroalaEditorComponent
                tag='textarea'
                config={{
                    events: {
                        'froalaEditor.contentChanged': (e, editor) => handleEditorChange(editor.html.get())
                    }
                }}
            />
            <button onClick={handleButtonClick}>Click Me</button>
        </div>
    );
}
