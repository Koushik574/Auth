const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cors = require("cors");


app.use(express.json());
app.use(cors( { origin: ["http://localhost:3000", "https://auth-ebon-kappa.vercel.app/"] }));


app.post("/register", async (req, res) => {
  //Data from Frontend

  const userData = req.body;

  //DB Logic

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  console.log(existingUser, userData);

  if (existingUser === null) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUserData = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phonenumber: userData.phonenumber,
        dob: userData.dob,
        password: hashedPassword,
      },
    });

    //Data to Frontend
    res
      .status(201)
      .json({ message: "User created successfully", data: newUserData });
  } else {
    res.status(400).json({ message: "user already exists" });
  }
});

app.post("/login", async (req, res) => {
  //Data from Frontend
  const userData = req.body;

  //DB Logic
  const exisitingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  console.log(exisitingUser, userData);

  if (exisitingUser) {
    const comparePassword = await bcrypt.compare(
      userData.password,
      exisitingUser.password
    );

    if (comparePassword) {
      let accessToken = jwt.sign({ userId: userData.userId }, "key", {
        expiresIn: "1m",
      });

      let refreshToken = jwt.sign({ userId: userData.userId }, "key", {
        expiresIn: "2m",
      });

      await prisma.refreshToken.create({
        data: {
          userId: exisitingUser.id,
          token: refreshToken,
        },
      });

      return res.json({
        data: exisitingUser,
        message: "Login Successfully",
        token: { accesToken: accessToken, refreshToken: refreshToken },
      });
    } else {
      return res.json({ data: null, message: "Incorrect password" });
    }
  } else {
    return res.json({ message: "User not found" });
  }

  //Data to Frontend
});

app.post("/refresh", async (req, res) => {
  //Data from Frontend
  const uData = req.body;

  //DB Logic
  const tokenExists = await prisma.refreshToken.findUnique({
    where: {
      token: uData.token.refreshToken,
    },
  });

  if (tokenExists !== null) {
    jwt.verify(tokenExists.token, "key", function (err, decoded) {
      if (err) {
        return res.json({ message: "Invalid token" });
      }

      let accessToken = jwt.sign({ userId: tokenExists.userId }, "key", {
        expiresIn: "1m",
      });

      return res.status(200).json({ accessToken });
    });
  } else {
    return res.json({ message: "Invalid token" });
  }

  //Data to Frontend
});

const authToken = (req, res, next) => {
    console.log("1.", req.headers);
  
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
  
    console.log("2.", authToken);
  
    console.log("3.", token);
  
    if (!token) {
      return res.send("Login again");
    } else {
      jwt.verify(token, "key", (err) => {
        if (err) {
          return res.send("Error");
        } else {
          next();
        }
      });
    }
  };
  
  app.get("/protected", authToken, (req, res) => {
    res.send("Protected Route secret informaton");
  }); // Private Route
  

app.listen(3000, () => {
  console.log("Server is runnning on port 3000");
});
