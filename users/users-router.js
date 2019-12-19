const router = require("express").Router();

const Users = require("./users-model");
const authentication = require("../auth/middleware");

router.get("/", authentication, (req, res) => {
  const userId = req.token.id;
  Users.findById(userId)
    .first()
    .then(user => {
      if (user) {
        Users.findByDepartment(user.department)
          .then(users => {
            res.status(200).json(users);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error getting users" });
          });
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting users" });
    });
});

module.exports = router;
