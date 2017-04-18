function withdraw(balance) {
    return function(amount) {
        balance = balance - amount;
        return balance;
    }
}

function decrementer(balance) {
    return function(amount) {
        return balance - amount;
    }
}