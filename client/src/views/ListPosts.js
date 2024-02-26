import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const apiServer = `http://localhost:3300`;

const ListPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await axios.get(`${apiServer}/posts`).then((res) => {
        if (posts.length !== res.data.length) {
          setPosts(res.data);
        } else {
          return;
        }
      });
    })();
  }, [posts]);
  const handleRemove = (ev, postID) => {
    ev.preventDefault();

    axios.delete(`${apiServer}/posts/${postID}`).then((res) => {
      const newPosts = posts.filter((post) => {
        return post.id !== postID;
      });
      setPosts(newPosts);
    });
  };
  return (
    <>
      <Container fluid>
        <Row>
          {posts.map((post, index) => {
            return (
              <Col key={index} lg={3}>
                <Link to={`list-posts/${post.id}`}>
                  <Card>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <p className="post__title mb-0 text-truncate">{post.title}</p>
                      <div className="btn__group mx-2 d-flex align-items-center">
                        <Link
                          to={`/admin/update-post/${post.id}`}
                          className="border-0 lh-0"
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={(e) => handleRemove(e, post.id)}
                          className="border-0 lh-0"
                        >
                          <i className="nc-icon nc-simple-remove text-danger font-weight-bold"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default ListPost;
