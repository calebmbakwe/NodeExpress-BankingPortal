const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Account Summary',
		accounts
	});
}).get('/savings', (req, res) => {
	res.render('account', { account: accounts.savings });
})
.get('/checking', (req, res) => {
	res.render('account', { account: accounts.checking });
})
.get('/credit', (req, res) => {
	res.render('account', { account: accounts.credit });
})
.get('/profile', (req, res) => {
	res.render('profile', { user: users[0] });
})
.get('/transfer', (req, res) => {
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

app.listen(3000, (err) => {
	console.log('PS Project Running on port 3000!');
});