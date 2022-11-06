var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
var path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { log } = require("console");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "bookDbs";

str = "string";

var billNum = 1001;

app.route("/").get(function (req, res) {
  console.log("login running");
  res.render("login", { username: "" });
});

app.route("/admin").get(function (req, res) {
  res.render("adminlogin", { username: "" });
});

app.route("/about").get(function (req, res) {
  log("about running");
  res.render("about");
})

app.route("/adminbook").post(function (req, res) {
  res.render("books");
});

app.route("/userbook").post(function (req, res) {
  res.render("userbooks");
});

app.route("/userbook").get(function (req, res) {
  res.render("userbooks");
});
app.route("/usermagazines").get(function (req, res) {
  res.render("usermagazines");
});
app.route("/usermagazines").post(function (req, res) {
  res.render("usermagazines");
});

app.route("/adminmagazines").post(function (req, res) {
  res.render("magazines");
});

app.route("/usermagazines").post(function (req, res) {
  res.render("usermagazines");
});

app.route("/bookorder").post(function (req, res) {
  res.render("bookorder");
});

app.route("/magazineorder").post(function (req, res) {
  res.render("magazineorder");
});

app.route("/bookorder").get(function (req, res) {
  res.render("bookorder");
});

app.route("/adminhome2").post(function (req, res) {
  res.render("adminhome");
});

app.route("/userhome2").post(function (req, res) {
  res.render("userhome");
});

// app.route("/payment").post(function (req, res) {
//   let dummy = JSON.parse(req.body.products);
//   console.log(''JSON.stringify(dummy));
//   res.render("payment", { products: JSON.stringify(dummy) });
// });

app.route("/dispbill").post(function (req, res) {
  var prodD = req.body.prods;
  var prodArr = [];

  //prodArr = JSON.parse(angular.toJson(prodData));
  prodArr = JSON.parse(prodD);

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("products");

    col.insert(prodArr, { w: 1 }, function (err, result) {
      if (err) {
        console.log("error occured");
      } else {
        db.close;
      }
    });
  });
  res.send("data saved");
});

app.route("/register").post(function (req, res) {
  res.render("register");
});

app.route("/registered").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    db.collection("login").insert(
      {
        fname: req.body.fname,
        sname: req.body.sname,
        email: req.body.email,
        userPassword: req.body.userPassword,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone,
      },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.send("Registration Error");
        } else {
          db.close;
          res.render("login", { username: "" });
        }
      }
    );
  });
  //    res.send(req.body);
});

app.route("/adminregister").post(function (req, res) {
  res.render("adminregister");
});

app.route("/adminregistered").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    db.collection("adminlogin").insert(
      {
        fname: req.body.fname,
        sname: req.body.sname,
        email: req.body.email,
        userPassword: req.body.userPassword,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone,
      },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.send("Registration Error");
        } else {
          db.close;
          res.render("adminlogin", { username: "" });
        }
      }
    );
  });
  //    res.send(req.body);
});

app.post("/addBook", function (req, res) {
  //var prodD = req.body.prods;
  var prodArr = [];
  console.log(req.body);
  //prodArr = JSON.parse(req.body);
  prodArr = req.body;
  console.log("prodArr array from addProduct http post");
  console.log(prodArr);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("books");

    col.insert(prodArr, { w: 1 }, function (err, result) {
      //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
      if (err) {
        console.log("error occured");
        res.json("error occured");
      } else {
        db.close;
        res.json("Data Submitted Successfully");
      }
    });
  });
});

app.post("/addMagazine", function (req, res) {
  //var prodD = req.body.prods;
  var prodArr = [];
  console.log(req.body);
  //prodArr = JSON.parse(req.body);
  prodArr = req.body;
  console.log("prodArr array from addProduct http post");
  console.log(prodArr);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("magazines");

    col.insert(prodArr, { w: 1 }, function (err, result) {
      //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
      if (err) {
        console.log("error occured");
        res.json("error occured");
      } else {
        db.close;
        res.json("Data Submitted Successfully");
      }
    });
  });
});

app.post("/updateBooks", function (req, res) {
  //var prodD = req.body.prods;
  var prodArr = [];
  console.log(req.body);
  //prodArr = JSON.parse(req.body);
  prodArr = req.body;
  prodString = prodArr[0];
  console.log("prodArr array from updateBooks http post");
  console.log(prodString);
  console.log(prodArr[0].isbn);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("books");

    col.update({ isbn: prodArr[0].isbn }, prodString, function (err, result) {
      if (err) {
        console.log(err);
        res.json("error occured");
      } else {
        db.close;
        res.json("Data Updated Successfully");
      }
    });
  });
});

app.post("/updateMagazines", function (req, res) {
  //var prodD = req.body.prods;
  var prodArr = [];
  console.log(req.body);
  //prodArr = JSON.parse(req.body);
  prodArr = req.body;
  prodString = prodArr[0];
  console.log("prodArr array from updateBooks http post");
  console.log(prodString);
  console.log(prodArr[0].issn);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("magazines");

    col.update({ issn: prodArr[0].issn }, prodString, function (err, result) {
      if (err) {
        console.log(err);
        res.json("error occured");
      } else {
        db.close;
        res.json("Data Updated Successfully");
      }
    });
  });
});

app.post("/getBook", function (req, res) {
  var prodArr = [];
  prodArr = req.body;
  console.log("prodArr array from getProduct http post");
  console.log(prodArr);
  console.log(prodArr[0].isbn);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("books");
    db.collection("books").findOne(
      { isbn: prodArr[0].isbn },
      { projection: { _id: 0 } },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid isbn code");
        } else {
          db.close;
          console.log("result");
          console.log(result);
          var r = [];
          r.push(result);

          console.log(r);
          //                console.log(Array.isArray(r));
          s = JSON.stringify(r);

          console.log(s);
          res.json(s);
        }
      }
    );
  });
});

app.post("/getMagazines", function (req, res) {
  var prodArr = [];
  prodArr = req.body;
  console.log("prodArr array from getProduct http post");
  console.log(prodArr);
  console.log(prodArr[0].issn);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("magazines");
    db.collection("magazines").findOne(
      { issn: prodArr[0].issn },
      { projection: { _id: 0 } },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid issn code");
        } else {
          db.close;
          console.log("result");
          console.log(result);
          var r = [];
          r.push(result);

          console.log(r);
          //                console.log(Array.isArray(r));
          s = JSON.stringify(r);

          console.log(s);
          res.json(s);
        }
      }
    );
  });
});

app.post("/deleteBook", function (req, res) {
  var prodArr = [];
  prodArr = req.body;
  console.log("prodArr array from deleteBook http post");
  console.log(prodArr);
  console.log(prodArr[0].isbn);

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("books");
    db.collection("books").deleteOne(
      { isbn: prodArr[0].isbn },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log(result);
          res.json("product deleted successfully");
        }
      }
    );
  });
});

app.post("/deleteMagazines", function (req, res) {
  var prodArr = [];
  prodArr = req.body;
  console.log("prodArr array from deleteBook http post");
  console.log(prodArr);
  console.log(prodArr[0].issn);

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("magazines");
    db.collection("magazines").deleteOne(
      { issn: prodArr[0].issn },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log(result);
          res.json("product deleted successfully");
        }
      }
    );
  });
});

app.post("/getBookDetails", function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("books");

    db.collection("books")
      .find({}, { projection: { _id: 0 } })
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log("result");
          console.log(result);

          // var r = [];
          // r.push(result);

          //console.log(r);
          //console.log(Array.isArray(r));
          s = JSON.stringify(result);

          console.log(s);

          res.json(s);
        }
      });
  });
});

app.post("/getBookOrderDetails", function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server booksales.find()");

    const db = client.db(dbName);
    var col = db.collection("booksales");

    db.collection("booksales")
      .find({}, { projection: { _id: 0 } })
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log("result");
          console.log(result);

          // var r = [];
          // r.push(result);

          //console.log(r);
          //console.log(Array.isArray(r));
          s = JSON.stringify(result);

          console.log(s);

          res.json(s);
        }
      });
  });
});

app.post("/getMagazineOrderDetails", function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server booksales.find()");

    const db = client.db(dbName);
    var col = db.collection("magazinesales");

    db.collection("magazinesales")
      .find({}, { projection: { _id: 0 } })
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log("result");
          console.log(result);

          // var r = [];
          // r.push(result);

          //console.log(r);
          //console.log(Array.isArray(r));
          s = JSON.stringify(result);

          console.log(s);

          res.json(s);
        }
      });
  });
});

app.post("/getMagazineDetails", function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("magazines");

    db.collection("magazines")
      .find({}, { projection: { _id: 0 } })
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log("result");
          console.log(result);

          // var r = [];
          // r.push(result);

          //console.log(r);
          //console.log(Array.isArray(r));
          s = JSON.stringify(result);

          console.log(s);

          res.json(s);
        }
      });
  });
});

app.post("/getProductCategory", function (req, res) {
  var prodArr = [];
  prodArr = req.body;
  console.log("prodArr array from getProductCategory http post");
  console.log(prodArr);
  console.log(prodArr[0].pCategory);

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("products");

    db.collection("products")
      .find({ pCategory: prodArr[0].pCategory }, { projection: { _id: 0 } })
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.json("Invalid product code");
        } else {
          db.close;
          console.log("result");
          console.log(result);

          // var r = [];
          // r.push(result);

          //console.log(r);
          //console.log(Array.isArray(r));
          s = JSON.stringify(result);

          console.log(s);

          res.json(s);
        }
      });
  });
});

app.route("/adminhome").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    //console.log(req.body.userid);
    //console.log(req.body.username);
    //uid=req.body.userid;
    const db = client.db(dbName);
    db.collection("adminlogin").findOne(
      { email: req.body.email, userPassword: req.body.userPassword },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.send("Invalid Login");
        } else {
          db.close;
          res.render("adminhome");
        }
      }
    );
  });
});

app.route("/userhome").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    //console.log(req.body.userid);
    //console.log(req.body.username);
    //uid=req.body.userid;
    const db = client.db(dbName);
    db.collection("login").findOne(
      { email: req.body.email, userPassword: req.body.userPassword },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.send("Invalid Login");
        } else {
          db.close;
          res.render("userhome");
        }
      }
    );
  });
});

app.route("/apparels").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    //console.log(req.body.userid);
    //console.log(req.body.username);
    //uid=req.body.userid;
    const db = client.db(dbName);
    db.collection("login").findOne(
      { email: req.body.email, userPassword: req.body.userPassword },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.send("Invalid Login");
        } else {
          db.close;
          res.render("apparelsCat");
        }
      }
    );
  });
});

app.route("/billing").post(function (req, res) {
  let books = [];
  
 books = req.body;
  console.log('billing',books);
  for(const el in books){
      isbn = el.isbn ? el.isbn : el.issn;
      title = el.title;
      price = el.price;
      quantity = el.quantity;
      discount = el.discount;
  }
  console.log("prod", books);
  res.render("billing", { products: JSON.stringify(books) });
});

app.route("/payment").post(function (req, res) {
  let books = [];
  
  books = JSON.parse(req.body.text);
  console.log('chemateck',books);
  res.render("payment", { products: JSON.stringify(books) });
});

app.route("/getBillNo").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    db.collection("booksales")
      .find({})
      .sort({ billno: -1 })
      .limit(1)
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          // db.close;
          res.send("1000");
        } else {
          // db.close;
          billNum = 1000; //Comment this line and recomment from next line after first execution
          // billNum = result[0].billno;
          console.log("Inside sales.find()");
          console.log(billNum);
          billArr = [];
          billArr = [{ billno: billNum }];
          res.send(billArr);
        }
      });
  });
});

app.route("/getMagazineBillNo").post(function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    db.collection("magazinesales")
      .find({})
      .sort({ billno: -1 })
      .limit(1)
      .toArray(function (err, result) {
        if (err) throw err;

        if (!result) {
          db.close;
          res.send("1000");
        } else {
          db.close;
          billNum = 1000; //Comment this line and recomment from next line after first execution
          //    billNum = result[0].billno;
          console.log("Inside sales.find()");
          console.log(billNum);
          billArr = [];
          billArr = [{ billno: billNum }];
          res.send(billArr);
        }
      });
  });
});

app.route("/makePayment").post(function (req, res) {
  res.render("makePayment");
});

app.post("/addBookOrder", function (req, res) {
  //var prodD = req.body.prods;
  var prodArr = [];
  console.log(req.body);
  //prodArr = JSON.parse(req.body);
  prodArr = req.body;
  console.log(prodArr);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("booksales");

    col.insert(prodArr, { w: 1 }, function (err, result) {
      //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
      if (err) {
        console.log("error occured");
        res.json("error occured");
      } else {
        db.close;
        res.json("Data Submitted Successfully");
      }
    });
  });
});

app.post("/addMagazineOrder", function (req, res) {
  //var prodD = req.body.prods;
  var prodArr = [];
  console.log(req.body);
  //prodArr = JSON.parse(req.body);
  prodArr = req.body;
  console.log(prodArr);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    var col = db.collection("magazinesales");

    col.insert(prodArr, { w: 1 }, function (err, result) {
      //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
      if (err) {
        console.log("error occured");
        res.json("error occured");
      } else {
        db.close;
        res.json("Data Submitted Successfully");
      }
    });
  });
});

app.route("/homepage").post(function (req, res) {
  res.render("apparelsCat");
});

app.route("/payU").get(function (req, res) {
  res.render("payU");
});

var exp = app.listen(port, function () {
  console.log("3000 is the magic port",'http://localhost:3000');
});

//exp.close;
