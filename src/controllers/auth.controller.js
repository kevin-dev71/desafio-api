import jwt from "jsonwebtoken"

import User from "../models/User"
import Role from "../models/Role"
import config from "../config"

export const signUp = async (req, res) => {
  const { email, password, name, surname, address, orderHistory, roles } =
    req.body

  try {
    const newUser = new User({
      email,
      password: await User.encryptPassword(password),
      name,
      surname,
      address,
      roles,
    })

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } })

      newUser.roles = foundRoles.map((role) => role._id)
    } else {
      const role = await Role.findOne({ name: "user" })
      newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    })

    res.status(200).json({ msg: "Register Success!", token })
  } catch (error) {
    res.status(400).json({ message: error.message, err: error.message })
  }
}

export const signIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  )

  if (!userFound)
    return res
      .status(400)
      .json({ message: "User not found", err: "User not found" })

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  )

  if (!matchPassword)
    return res
      .status(401)
      .json({ message: "Invalid Password", err: "User not found" })

  const access_token = jwt.sign(
    { id: userFound._id },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: 86400 }
  )

  const refresh_token = jwt.sign(
    { id: userFound._id },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  )

  res.json({
    msg: "Login Success!",
    access_token,
    refresh_token,
    user: userFound,
  })
}

export const accessToken = async (req, res) => {
  try {
    const rf_token = req.body.refreshtoken
    if (!rf_token) return res.status(400).json({ err: "Please login now!" })   

    const result = jwt.verify(rf_token, config.REFRESH_TOKEN_SECRET)
    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." })

    const userFound = await User.findById(result.id)
    if (!userFound) return res.status(400).json({ err: "User does not exist." })

    const access_token = jwt.sign(
      { id: userFound._id },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    )

    res.json({
      access_token,
      user: userFound
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
