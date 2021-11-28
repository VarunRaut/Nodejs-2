const { app } = require("express");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/admin/products", (req, res) => {
  let url = "https://fakestoreapi.com/products";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => res.send(data));
});

router.get("/admin/users", (req, res) => {
  let names = [];
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((resp) => resp.json())
    .then((text) => {
      text.map((ele) => {
        names.push(`${ele.name}`);
      });
    })
    .then((text) => res.send(names));
});

module.exports = router;
