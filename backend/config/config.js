if (!process.env.MONGO_URL) throw new Error("Mongodb URL not found");
if (!process.env.JWTSECRET) throw new Error("Jwt Secret not found");

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWTSECRET: process.env.JWTSECRET,
};



module.exports = { config };
