const express = require('express');
const app = express();
const PORT = process.env.PORT; // 8080

const headers = {
	headers: {
		"X-Master-Key": process.env.API_KEY
	}
};

// API url and ID's
const apiUrl = process.env.API_URL,
	blocks = process.env.BIN_ID_BLOCKS,
	transactions = process.env.BIN_ID_TRANSACTIONS,
	nodes = process.env.BIN_ID_NODES,
	mainnetStat = process.env.BIN_ID_MAINNETSTAT,
	revenue = process.env.BIN_ID_REVENUE;












app.listen(PORT, () => {
	console.log('Hello World')
});