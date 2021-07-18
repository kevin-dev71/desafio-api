import jwt from "jsonwebtoken"
import config from "../config"
import User from "../models/User"
import Role from "../models/Role"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]

    if (!token) return res.status(403).json({ message: "No Token provided" })

    jwt.verify(token, config.SECRET, async (err, decoded) => {
      if (err) return res.status(400).json({ message: "Invalid Token" })

      const user = await User.findById(decoded.id, { password: 0 })

      if (!user) return res.status(404).json({ message: "User not found" })

      req.userId = decoded.id

      next()
    })
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId) // req.userId is seeted in verifytoken function
  const roles = await Role.find({ _id: {$in: user.roles}})

  for (let role of roles) {
    if(role.name === "admin") {
      next()
      return;
    }
  }

  return res.status(403).json({ message: "Require Admin Role"})
}