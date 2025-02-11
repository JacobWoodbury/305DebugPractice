// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Add EJS as template engine
app.set('view engine', 'ejs');

// Define the port number where our server will listen
const PORT = 3000;

// Store tasks in memory (this will reset when server restarts)
const tasks = [];

/*
 * Define routes for different pages and actions
 */

// Home page with task form
app.get('/', (req, res) => {
    res.render('home');
});

// Dashboard page to view all tasks
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { tasks });
});

// Handle new task submission
app.post('/add-task', (req, res) => {

    // Get form data from request body
    const task = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        status: 'pending',
        timestamp: new Date()
    };

    if (task.title.trim() === "") {
        res.send("Invalid Title!")
    }

    if (task.description.trim() === "") {
        res.send("Invalid Description!")
    }

    if (!["low", "medium", "high"].includes(task.priority)) {
        res.send("Invalid Priority!")
    }
    
    // Save task to our array
    tasks.push(task);
    
    // Log the task to the console
    console.log('New task added:', task);

    // Render confirmation page instead of redirecting
    res.render('confirmation', { task });
});

// Start the server and make it listen on our specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 