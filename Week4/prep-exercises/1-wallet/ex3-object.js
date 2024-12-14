import eurosFormatter from './euroFormatter.js';

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyallowance: 40,
    _dailyWithdrawals:0,


    deposit: function (amount) {
      this._cash += amount;
    },

    withdraw: function (amount) {
      if (this._cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }
      if(this._dailyWithdrawals + amount > this._dailyallowance){
        console.log('Insufficient allowance');
    return 0;
  }

      this._cash -= amount;
      this._dailyWithdrawals += amount;
      return amount;
    },

    transferInto: function (wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${
          this._name
        } to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    },

    setDailyAllowance: function ( newAllowance){
      this._dailyallowance = newAllowance;
      console.log(`Daily allowance is : ${eurosFormatter.format(newAllowance)}`);
    },

    resetDailyAllowance : function(){
      this._dailyWithdrawals = 0;
      console.log(`The Daily withdrawlas resetted `);
    },

    reportBalance: function () {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    getName: function () {
      return this._name;
    },
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJack.setDailyAllowance(80);
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
  
}

main();
