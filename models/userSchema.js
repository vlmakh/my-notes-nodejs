const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 4,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiUpdatePassSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiUpdateNameSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(4).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegSchema,
  joiLoginSchema,
  joiUpdatePassSchema,
  joiUpdateNameSchema,
};
