import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
const router = express.Router();


// Create admin
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving it to the database
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new admin instance
        const admin = new Admin({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            role: role || 'admin', // Default role is 'admin'
        });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { _id, name, role } = admin;
        const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

        return res.status(200).json({ id: _id, name, role, token, status: true, message: 'Login success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

//get all admin
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error });
    }
});

//get admin by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin', error });
    }
});

//update admin
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email} = req.body;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        admin.name = name;
        admin.email = email;
        await admin.save();
        res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error });
    }
});

//update admin password
router.put('/update-password/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    
    //hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        admin.password = hashedPassword;
        await admin.save();  
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error });
    }
});

//delete admin
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
});


export default router;