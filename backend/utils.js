const generateOtp = (length) => {
  let otp;
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * 10);
    otp = `${otp || ""}` + `${num}`;
  }

  return otp;
};

module.exports = { generateOtp };
