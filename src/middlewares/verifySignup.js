import { ROLES } from '../models/Role'
import User from '../models/User'

export const checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email})

  if(user) return res.status(400).json({ message: "The Email already exists"})

  next()
}

export const checkRolesExisted = (req, res, next) => {
  if(req.body.roles){
    for(let role of req.body.roles){
      if(!ROLES.includes(role)){
        return res.status(400).json({message: `Roles ${role} doesnt exists`})
      }

    }
  }
  next()
}