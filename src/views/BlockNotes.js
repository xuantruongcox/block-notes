import React, { useEffect, useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Card } from "react-bootstrap";
import "@blocknote/react/style.css";
import axios from "axios";
import ContentEditable from "react-contenteditable";
import CustomBlockView from "components/CustomBlockView/CustomBlockView";

const apiServer = `http://localhost:3300`;

const BlockNotes = () => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.textContent);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <ContentEditable
            data-placeholder="Your title"
            html={title}
            onChange={handleTitleChange}
            tagName="h1"
          ></ContentEditable>
        </Card.Header>
        <Card.Body>
          <CustomBlockView
            isCreate={true}
            onSubmit={postArticle}
          ></CustomBlockView>
        </Card.Body>
      </Card>
    </>
  );
  function postArticle(editorParams) {
    const article = {
      title,
      content: editorParams.topLevelBlocks,
    };
    axios.post(`${apiServer}/posts`, article).then((res) => {
      setTitle("");
      editorParams.removeBlocks(article.content);
      alert('Submitted!!!')
    });
  }
};

export default BlockNotes;
