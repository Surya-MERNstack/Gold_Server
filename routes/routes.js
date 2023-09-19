const router = require("express").Router();
const UserData = require("../model/userSchema");
const goldRateSchema = require("../model/GoldSchema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const Salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, Salt);

  const newUser = new UserData({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const { email } = req.body;

  const result = await UserData.findOne({ email: email });

  if (result)
    return res
      .status(400)
      .json({ message: "email is already exists!!!", status: 400 });

  try {
    await newUser.save();
    res
      .status(200)
      .json({ message: "Successfully registered", status: 200, Data: newUser });
  } catch (err) {
    res.status(402).json({ message: err, status: 402 });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserData.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email is not found", status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(402)
        .json({ message: "Password is wrong", status: 402 });
    }

    res.status(200).json({ message: "Login Successfully", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: 500 });
  }
});

router.get("/gold-rates", async (req, res) => {
  try {
    await goldRateSchema.find();
    res.status(200).json(goldRateSchema);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/gold-rates", (req, res) => {
  rate = req.body.rate;
  carat = req.body.carat;
  weight = req.body.weight;
  value = req.body.value;
  const date = new Date();

  const newGoldRate = new goldRateSchema({ date, rate, carat, weight, value });

  newGoldRate
    .save()
    .then(() => {
      res.status(201).json({ message: "Gold rate added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error saving gold rate", error });
    });
});

module.exports = router;
