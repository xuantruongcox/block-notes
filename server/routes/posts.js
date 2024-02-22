var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const data = await new Promise((resolve, reject) => {
    global.db.all("SELECT * FROM posts", function (err, posts) {
      if (err) {
        reject(err);
      } else {
        resolve(posts);
      }
    });
  });
  res.json(data);
});
router.get("/:postID", async function (req, res, next) {
  try {
    const data = await new Promise((resolve, reject) => {
      global.db.get(
        `SELECT * FROM posts WHERE id=${req.params.postID}`,
        function (err, posts) {
          if (err) {
            throw err;
          } else {
            resolve(posts);
          }
        }
      );
    });
    if (data) {
      res.json(data);
    } else {
      throw {
        status: 404,
        message: `Post with @${req.params.postID} not exists`,
      }
    }
  } catch (err) {
    if(err){
        next(err)
    }
  }
});
router.post("/", async function (req, res, next) {
  const query = `
        INSERT INTO posts (title, content) VALUES (?, ?)
    `;
  const data = {
    title: req.body.title,
    content: JSON.stringify(req.body.content),
  };
  global.db.run(query, [data.title, data.content]);
  res.json("Done!");
});
router.put("/:id", async function (req, res, next) {
  const query = `
        UPDATE posts SET title=?, content=? WHERE id=${req.params.id}
    `;
  const data = {
    title: req.body.title,
    content: JSON.stringify(req.body.content),
  };
  global.db.run(query, [data.title, data.content]);
  res.json("Done!");
});
router.delete("/:id", async function (req, res, next) {
  const query = `
          DELETE FROM posts WHERE id=${req.params.id}
      `;
  global.db.run(query);
  res.json("Done!");
});

module.exports = router;
