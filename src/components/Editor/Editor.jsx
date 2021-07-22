import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Tiny(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="llye9u61s05d1t8wpej0br4kyuqomj0ioj0g97bqkdnqxszo"
        onInit={(evt, editor) => editorRef.current = editor}
        value={props.value}
        init={{
          height: props.height || 320,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor link | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image | help',
        }}
        // inline={true}
        {...props}
      />
    </>
  );
}