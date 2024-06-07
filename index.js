// app.js
const express = require("express");
const db = require("./config/dataBase");
const path = require("path");
const userModel = require("./models/books.Schema");
const fs = require("fs");
const multer = require("multer");
const { error } = require("console");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"))

app.set("view engine", "ejs");

app.get("/view", (req, res) => {
  return res.render("view");
});

app.get("/form", (req, res) => {
  return res.render("form");
});

app.get("/", (req, res) => {
  userModel
    .find({})
    .then((data) => {
      return res.render("view", { data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error occurred while fetching data");
    });
});

const fileUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: fileUpload }).single('bookimage');

app.post("/insertData", uploads, (req, res) => {

  const { bookname, authorname, date, price, link ,id} = req.body;
  console.log(id);
  if (id) {
    console.log(req.file);
    if (req.file) {
      let bookimage = req.file.path;
      
      userModel.findById(id).then((data)=>{
        fs.unlinkSync(data.bookimage)
      }).catch((err)=>{
        return err;
      })

      // const { id } = req.params;

      userModel
        .findByIdAndUpdate(id, {
          bookname: bookname,
          authorname: authorname,
          date: date,
          price: price,
          bookimage: bookimage,
          link: link
        })
        .then(() => {
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    else{
      userModel
      .findByIdAndUpdate(id, {
        bookname: bookname,
        authorname: authorname,
        date: date,
        price: price,
        link: link,
      })
      .then(() => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    }
  } else {
    // const { bookname, authorname, date, price, link } = req.body;
    const bookimage = req.file.path;
    console.log(req.body);
    userModel
      .create({
        bookname: bookname,
        authorname: authorname,
        date: date,
        price: price,
        bookimage: bookimage,
        link: link,
      })
      .then((data) => {
        console.log(data);
        return res.redirect("/form");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Error occurred while saving data");
        return false;
      });
  }
});

app.get("/editData/:id", (req, res) => {
  const { id } = req.params;

  userModel.findById(id).then((user) => {
    if (user) {
      return res.render("edit", { user });
    } else {
      console.log("Unable to get the data at http://localhost:8081");
    }
  });
});

app.post("/updateData/:id", (req, res) => {});

app.get("/deleteData/:id", (req, res) => {
  const { id } = req.params;

  userModel.findById(id).then((data)=>{
    fs.unlinkSync(data.bookimage)
  }).catch((err)=>{
    return err;
  })

  userModel
    .findByIdAndDelete(id)
    .then(() => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.listen(8081, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("Server started at http://localhost:8081");
});
