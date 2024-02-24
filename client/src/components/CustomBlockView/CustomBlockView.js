import { BlockNoteView, useBlockNote } from "@blocknote/react";
import React, { useEffect } from "react";

const CustomBlockView = (props) => {
  let {
    content,
    onSubmit,
    isCreate = false,
    editable = true,
    theme = "light",
  } = props;
  if (typeof content === "string") {
    content = JSON.parse(content);
  }

  const light = {
   
  }
  const dark = {

  }
 
  const mainTheme = {
    light,
    dark
  }

  const editor = useBlockNote({
    initialContent: content ? content : undefined,
    editable: editable,
    defaultStyles: false,
    onEditorContentChange: (e)=>{
        if(!isCreate){
            onSubmit(e)
        }
    }
  });
  const submitBtn = isCreate ? <button onClick={()=>onSubmit(editor)} className="btn btn-primary">Submit</button> : null;
  return (
    <>
      <BlockNoteView theme={mainTheme[theme]} editor={editor}></BlockNoteView>
      {submitBtn}
    </>
  );
};

export default CustomBlockView;
