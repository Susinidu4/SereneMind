import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Create user
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body); // Debugging: Log the request body

    const { name, email, password, dob, role } = req.body;

    try {
        // Validate required fields
        if (!name || !email || !password) {
            console.log('Missing fields:', { name, email, password }); // Debugging: Log missing fields
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving it to the database
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const user = new User({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            dob,
            role: role || 'user', // Default role is 'user'
        });

        // Save the user to the database
        await user.save();

        // Send a success response
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { _id, name, role } = user;
        const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

        return res.status(200).json({ id: _id, name, role, token, status: true, message: 'Login success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const
        user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

//update user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, dob, role } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name;
        user.email = email;
        user.dob = dob;
        user.role = role;
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});


//delete user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const
        user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});


//update password of user
router.put('/update-password/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
   
    //hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = hashedPassword;
        await user.save();  
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error });
    }
});
export default router;