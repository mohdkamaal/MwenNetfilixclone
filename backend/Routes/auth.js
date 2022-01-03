
import express from 'express'
import { login_User, register_User } from '../Controller/auth.js'
const router =  express.Router()

//Register 

router.post('/register',register_User)


//LOG IN
router.post("/login",login_User)

export default  router