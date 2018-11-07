const express = require('express');
const { accounts } = require('../data');

const router = express.Router();

router.get('/savings', (req, res) => {
	res.render('account', { account: accounts.savings });
})
.get('/checking', (req, res) => {
	res.render('account', { account: accounts.checking });
})
.get('/credit', (req, res) => {
	res.render('account', { account: accounts.credit });
});

module.exports = router;