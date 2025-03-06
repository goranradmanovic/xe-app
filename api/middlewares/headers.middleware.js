function headers(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*') // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true') // Allow cookies
  next()
}

module.exports = { headers }