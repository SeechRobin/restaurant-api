let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

mongoose.Promise = Promise;

const dbUrl = "mongodb://user:abc123@ds233323.mlab.com:33323/open-table";

const Food = mongoose.model("Food", {
  group: Number,
  name: String,
  price: Number,
  quantity: Number
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project Support"
  });
});

app.get("/food", (req, res) => {
  Food.find({}, (err, food) => {
    if (err) res.sendStatus(400);
    res.send(food);
  });
});

app.get("/messages/:user", (req, res) => {
  var user = req.params.user;
  Message.find(
    {
      name: user
    },
    (err, messages) => {
      res.send(messages);
    }
  );
});

// app.post("/messages", async (req, res) => {
//   try {
//     var message = new Message(req.body);

//     var savedMessage = await message.save();

//     console.log("saved");

//     var censored = await Message.findOne({
//       message: "badword"
//     });

//     if (censored)
//       await Message.remove({
//         _id: censored.id
//       });
//     else io.emit("message", req.body);

//     res.sendStatus(200);
//   } catch (error) {
//     res.sendStatus(500);
//     return console.error(error);
//   } finally {
//     console.log("message post called");
//   }
// });

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true },
  err => {
    console.log("mongo db connection", err);
  }
);

const port = 3002;
let server = app.listen(port, function() {
  console.log("Express server listening on port " + port);
});
