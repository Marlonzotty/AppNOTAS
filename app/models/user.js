// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.methods.hashPassword = async function () {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
};
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    await this.hashPassword();
  }
  next();
});

userSchema.methods.isCorrectPassword = function(password, user) {
  /*bcrypt.compare(password, this.password, function(err, same) {
    if(err)
    callback(user);
  else
  callback(err, same);
  })*/
  const compare = bcrypt.compare(password, user.password)
  console.log(compare);
  return compare;
}


module.exports = mongoose.model("User", userSchema);
