const mongoose = require("../Database/db")
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,

    },

    password:{
        type: String,
        required:true,
        select: false,

    },

    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,

    },
    createdAt:{
        type: Date,
        default: Date.now

    }
});

UserSchema.pre("save", async function(next) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  });
const User = mongoose.model("User", UserSchema);

module.exports = User;