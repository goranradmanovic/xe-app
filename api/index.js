require('dotenv').config()

const express = require('express'),
	app = express(),
	PORT = process.env.PORT || 3000, // 8080
	headersMiddleware = require('./middlewares/headers.middleware'),
	apiRoutes = require('./routes/Api.routes')

// Middleware to set response headers
app.use(headersMiddleware.headers)

// Use API routes
app.use(apiRoutes)

// Handle other endpoints or invalid requests
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})