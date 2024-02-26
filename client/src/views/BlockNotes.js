import React, { useEffect, useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Card } from "react-bootstrap";
import axios from "axios";
import ContentEditable from "react-contenteditable";
import CustomBlockView from "components/CustomBlockView/CustomBlockView";
import { Container } from "react-bootstrap";

const apiServer = `http://localhost:3300`;

const BlockNotes = () => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.textContent);
  };

  return (
    <Container>
      <ContentEditable
        data-placeholder="Your title"
        html={title}
        onChange={handleTitleChange}
        tagName="h1"
      ></ContentEditable>

      <CustomBlockView isCreate={true} onSubmit={postArticle}></CustomBlockView>
    </Container>
  );
  function postArticle(editorParams) {
    const article = {
      title,
      content: editorParams.topLevelBlocks,
    };
    axios.post(`${apiServer}/posts`, article).then((res) => {
      setTitle("");
      editorParams.removeBlocks(article.content);
      alert("Submitted!!!");
    });
  }
};

export default BlockNotes;
