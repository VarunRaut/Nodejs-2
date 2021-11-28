const application = require("express");
const app = application();

let isAdmin = false;

function changeAdmin() {
  isAdmin = !isAdmin;
  console.log(isAdmin);
  return isAdmin;
}

module.exports = {
  isAdmin: isAdmin,
  changeAdmin: changeAdmin()
};
