import {User} from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import  { RequestHandler } from "express";
import { getManager } from "typeorm";
import { Movie } from "../entity/Movie";
import { Actor } from "../entity/Actor";









// UPDATE USER
export const update_user: RequestHandler=async (req, res) => {
  const id = req.params.id
  const { firstName, lastName, email, password } = req.body
console.log(req.body)
  try {
    const user = await User.findOneOrFail({where: { id }})

    
    user.email = email || user.email
    user.password = password || user.password
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    
    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

// DELETE USER

export const delete_user: RequestHandler=async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOneOrFail({where:{ id }})

    await user.remove()

    return res.status(204).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}



//FIND SINGLE USER
export const find_single_user: RequestHandler=async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOneOrFail({where:{ id }, relations:['movies','actors','comments']})

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ user: 'User not found' })
  }
}




//FIND ALL USERS

export const find_all_users: RequestHandler=async (req, res) => {

  try {
    const user = await User.find( {relations:["comments"]})

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ user: 'User not found' })
  }
}


//FIND USERS MOVIES

export const find_users_movies: RequestHandler = async (req, res) => {
  const id = req.params.id
console.log(id)
    try {
      const movies = await Movie.find({ where: { user: id} })
  
      return res.json(movies)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Movies not found' })
    }
  }

//FIND USERS ACTORS

export const find_users_actors: RequestHandler = async (req, res) => {
  const id = req.params.id
console.log(id)
    try {
      //const actors = await Actor.find({ where: { user: id} })
      const user = await User.findOne(id, {relations:["actors"]})
      return res.json(user.actors)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Actors not found' })
    }
  }
