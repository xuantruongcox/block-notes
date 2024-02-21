import React from "react";
import { useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

function BlockNotes() {
  const editor = useBlockNote({});
  return <BlockNoteView editor={editor} theme={"light"}></BlockNoteView>
}

export default BlockNotes;