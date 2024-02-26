import { BlockNoteView, useBlockNote, Theme } from "@blocknote/react";
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
    fontFamily: "inherit",
  }
  const dark = {
    fontFamily: "inherit",
  };

  const mainTheme = {
    light,
    dark,
  };

  const editor = useBlockNote({
    initialContent: content ? content : undefined,
    editable: editable,
    defaultStyles: false,
    domAttributes: {
      blockContainer: {
        class: "block-container",
      },
      editor: {
        class: "px-0",
      },
    },
    onEditorContentChange: (e) => {
      if (!isCreate) {
        onSubmit(e);
      }
    },
  });
  const submitBtn = isCreate ? (
    <button onClick={() => onSubmit(editor)} className="btn btn-primary">
      Submit
    </button>
  ) : null;
  return (
    <>
      <BlockNoteView theme={mainTheme[theme]} editor={editor}></BlockNoteView>
      {submitBtn}
    </>
  );
};

export default CustomBlockView;
