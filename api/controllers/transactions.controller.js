const fetchData = require('../utils/fetch.utils')

class TransactionsController {
  static async getAllTransactions(req, res) {
    try {
      const data = await fetchData(process.env.BIN_ID_TRANSACTIONS)
      
      if (!data) {
        return res.status(404).json({ error: "Data not found" })
      }

      res.status(200).json(data)
    } catch (error) {
      console.error("Error fetching blocks:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}

module.exports = TransactionsController