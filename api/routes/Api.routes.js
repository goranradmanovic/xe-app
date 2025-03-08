const express = require('express'),
	router = express.Router(),
	BlocksController = require('../controllers/blocks.controller'),
	TransactionsController = require('../controllers/transactions.controller'),
	NodesController = require('../controllers/nodes.controller'),
	MainNetStatController = require('../controllers/mainnetstat.controller'),
	RevenueController = require('../controllers/revenue.controller')
	CoinController = require('../controllers/coin.controller')

// Handle the /api endpoint
router.get('/api/blocks', BlocksController.getAllBlocks)
router.get('/api/transactions', TransactionsController.getAllTransactions)
router.get('/api/nodes', NodesController.getAllNodes)
router.get('/api/mainnetstat', MainNetStatController.getAllMainNetStat)
router.get('/api/revenue', RevenueController.getAllRevenue)
router.get('/api/coin', CoinController.getAllCoin)

module.exports = router