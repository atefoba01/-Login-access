const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const users = []; // In-memory user store

const SECRET_KEY = 'your_secret_key'; // Should be in an environment variable

// Function to add a predefined user for testing
const addTestUser = async () => {
    const username = 'Emma';
    const email = 'emma@example.com';
    const password = 'atef@2023';
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
};

// Add the test user when the server starts
addTestUser().then(() => console.log('Test user added'));

// Login route
app.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    const user = users.find(user => user.username === name && user.email === email);
    if (!user) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Auth middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// Multer storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// File upload route
app.post('/upload', authMiddleware, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected');
            } else {
                res.json({
                    message: 'File uploaded successfully',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
