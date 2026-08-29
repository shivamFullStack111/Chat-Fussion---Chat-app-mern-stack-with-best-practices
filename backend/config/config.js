require("dotenv").config();
if (!process.env.MONGO_URL) throw new Error("Mongodb URL not found");
if (!process.env.JWTSECRET) throw new Error("Jwt Secret not found");
if (!process.env.MAIL_USER) throw new Error("Email for nodemailer not found");
if (!process.env.MAIL_PASSWORD) throw new Error("Password of email for nodemailer not found");

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWTSECRET: process.env.JWTSECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};

module.exports = { config };
