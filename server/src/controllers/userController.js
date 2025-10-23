const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ message: 'User ID and Password are required' });
    }

    // const hash = await bcrypt.hash('Nec@123', 10);
    // console.log(hash);

    try {
        // Find user by userId
        const user = await User.findOne({ where: { user_id: userId, is_deleted: '0', } });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        if (user.is_active === '0') return res.status(401).json({ message: 'User is inactive, please contact admin' });

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword);

        if (!validPassword) return res.status(401).json({ message: 'Password did not match' });

        // Create JWT payload
        const payload = {
            id: user.id,
            userId: user.user_id,
            name: user.user_name,
        };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: payload
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addUser = async (req, res) => {
    try {
        const { user_id, user_name, email, phone, role_id, department, branch, initial_password } = req.body;
        const newUser = await User.create({
            user_id,
            user_name,
            email,
            phone,
            role_id,
            department,
            branch,
            initial_password
        });
        return res.status(201).json(newUser);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



const getAllUser = async (req, res) => {
    try {

        const user = await User.findAll();
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    loginUser,
    addUser,
    getAllUser,
};
