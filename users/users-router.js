const router = require("express").Router();

const Users = require("./users-model");
const authentication = require("../auth/middleware");

router.get("/", authentication, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
