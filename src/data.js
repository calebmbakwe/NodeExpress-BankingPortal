const fs = require('fs');
const path = require('path');

// account data
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8');
const accounts = JSON.parse(accountData);

// user data
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8');
const users = JSON.parse(userData);

const writeJSON = () => {
	let accountsJSON = JSON.stringify(accounts, null, 4);
	fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'UTF8');
}

module.exports = {
	accounts,
	users,
	writeJSON
};