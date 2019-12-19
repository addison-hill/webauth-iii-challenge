const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findByDepartment,
  add,
  findById,
  findBy
};

function find() {
  return db("users").select("id", "username", "password", "department");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findByDepartment(department) {
  return db
    .select("*")
    .from("users")
    .where({ department: department });
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
