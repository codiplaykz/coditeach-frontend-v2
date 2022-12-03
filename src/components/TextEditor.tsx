import React from 'react';
// @ts-ignore
import {CKEditor} from '@ckeditor/ckeditor5-react';
// @ts-ignore
import {Editor} from 'ckeditor5-custom-build/build/ckeditor'
import '../styles/helpers/ckeditor.scss'

interface TextEditorProps {
    content: any,
    setContent: Function
}

export default function TextEditor({content, setContent}: TextEditorProps) {

    return (
        <div className="text-editor">
            {/*<CKEditor*/}
            {/*    editor={ ClassicEditor }*/}
            {/*    data="<p>Hello from CKEditor 5!</p>"*/}
            {/*/>*/}
            <CKEditor
                editor={ Editor }
                data={content}
                onChange={ ( event: any, editor: any ) => {
                    const data = editor.getData();
                    setContent(data)
                } }
            />
        </div>
    )
}