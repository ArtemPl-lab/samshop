import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import api from '../../api/api';

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
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(evt, editor) => editorRef.current = editor}
        value={props.value}
        init={{
          height: props.height || 320,
          menubar: false,
          images_upload_url: `${api.address}/resources/`,

          images_upload_handler: async function (blobInfo, success, failure) {
            console.log(blobInfo);
            const resp = await api.uploadMedia(blobInfo.blob())
            if(resp.status === 200){
                const { id } = await resp.json();
                success(`${api.address}/resources/${id}`);
            }
            else{
              failure("Не олучилось загрузить картинку. Увольте бэкендера");
            }
          },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount code'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor link | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image | code | help',
        }}
        // inline={true}
        {...props}
      />
    </>
  );
}