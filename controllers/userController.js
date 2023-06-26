const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/User')


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()  // lean removes specific data to lighten the load
    if (!users) {
        return res.status(400).json({ message: 'no users found' })
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    const { user_name, email, password } = req.body
    //data confirmation
    if (!user_name || !email || !password) {
        return res.status(400).json({ message: 'please fill out all fields '})
    }
    const duplicate = await User.findOne({ user_name }).lean().lean().exec() 
    if (duplicate) {
        return res.status(409).json({ message: "someone else already has this username, please choose another or add symbols/numbers to slightly alter it and try again" })
    }
    //hash the pass yo!
    const hashedPw = await bcrypt.hash(password, 10)

    const userObject = {user_name, "password": hashedPw, email}

    const user = awaitUser.create(userObject)

    if (user) {
        res.status(201).json({ message: "congratulations! you just gave birth to a healthy baby user!" })
    } else {
        res.status(400).json({ message: "invalid user data recieved" })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    
    const { id, user_name, password} = req.body

    //confirm data
    if (!id || !user_name || !password) {
        return res.status(400).json({ message: "all fields are required" })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ mesage: "user not found" })
    }
    //check for duplicate
    const duplicate = await User.findOne({ user_name }).lean().exec()
    //allow updated to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return reset.status(409).json({ message: 'duplicate username'})
    }

    user.username = user_name

    if (password) {
        //hash the pass 
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} has been updated!` })

})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: "User ID required" })
    }
    
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.user_name} with id: ${result._id} has been deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}


