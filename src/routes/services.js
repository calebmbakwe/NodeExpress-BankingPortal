const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
	res.render('transfer');
})
.post('/transfer', (req, res) => {accounts[req.body.from].balance -= parseInt(req.body.amount);
	accounts[req.body.to].balance += parseInt(req.body.amount);

	writeJSON();

	res.render('transfer', { message: 'Transfer Completed' });
})
.get('/payment', (req, res) => {
	res.render('payment', { account: accounts.credit });
})
.post('/payment', (req, res) => {
	accounts.credit.balance -= parseInt(req.body.amount);
	accounts.credit.available += parseInt(req.body.amount);

	writeJSON();

	let accountsJSON = JSON.stringify(accounts, null, 4);
	fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'UTF8');

	res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;