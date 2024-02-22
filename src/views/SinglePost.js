import axios from "axios";
import CustomBlockView from "components/CustomBlockView/CustomBlockView";
import React, { createElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import { useParams, Redirect } from "react-router-dom";

const apiServer = `http://localhost:3300`;

const SinglePost = () => {
  const [content, setContent] = useState();
  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState();
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.textContent);
    console.log(e.currentTarget.textContent);
    const article = {
      title: e.currentTarget.textContent,
      content: JSON.parse(content),
    };
    axios.put(`${apiServer}/posts/${postID}`, article);
  };
  const postID = useParams().id;
  useEffect(() => {
    (async () => {
      const response = await axios
        .get(`${apiServer}/posts/${postID}`)
        .then((res) => res)
        .catch((reason) => {
          const {
            response: { status },
          } = reason;
          switch (status) {
            case 404: {
              setLoader(<Redirect to="/admin/dashboard"></Redirect>);
            }
          }
        });
      if (response && !title && !content) {
        setContent(response.data.content);
        setTitle(response.data.title);
      }
    })();
  });
  const onHandleSubmit = (editorParams) => {
    const article = {
      title: title,
      content: editorParams.topLevelBlocks,
    };
    axios.put(`${apiServer}/posts/${postID}`, article);
  };
  return (
    <Container id="block_view" fluid>
      <ContentEditable
        data-placeholder="Your title"
        onChange={handleTitleChange}
        html={title || ""}
        tagName="h1"
      ></ContentEditable>
      {content ? (
        <>
          <CustomBlockView onSubmit={onHandleSubmit} content={content} />
        </>
      ) : null}
      {loader}
    </Container>
  );
};

export default SinglePost;
