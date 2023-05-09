import express from "express";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.get("/", (req, res) => {
  console.log(req.headers);
  res.status(200).json({
    success: true,
  });
});

app.post("/register", (req, res) => {
  if (validateBasicAuth(req.headers.authorization)) {
    console.log("success");
  }

  res.status(200).json({
    accessToken: "random-token",
  });
});

app.listen(PORT, () => {
  console.log("listening to port *:" + PORT);
});

function validateBasicAuth(authHeader = "") {
  console.log({ authHeader });
  const [basic, token] = authHeader.split(" ");
  if (basic !== "Basic" || !token) throw new Error("unauthorized");
  const [username, password] = Buffer.from(token, "base64")
    .toString("ascii")
    .split(":");
  const valid =
    username === process.env.username && password === process.env.password;
  if (!valid) {
    throw new Error("unauthorized");
  }

  return true;
}
