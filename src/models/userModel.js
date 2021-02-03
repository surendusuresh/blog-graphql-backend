const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,    
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
});

userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

userSchema.pre("findOneAndUpdate", function () {  
  const password = this.getUpdate().password;  
  try {
    const hashedPassword = bcrypt.hashSync(password, 12);
    console.log(hashedPassword)
    this.getUpdate().password = hashedPassword;    
  }
  catch(error){
    
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
