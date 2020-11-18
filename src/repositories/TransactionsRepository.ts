import Transaction from '../models/Transaction';

interface CreateTransaction {
    title: string
    value: number
    type: string
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  sumIncome() {
    const tipo = this.transactions.filter( function( elem, index, array ) {
        return elem.type === 'income'
    } );

    const valores = tipo.map( function( elem ) {
      return elem.value
    })

    var total = valores.reduce(function(total, numero) {
      return total + numero
    }, 0)

    return total
  }

  sumOutcome() {
    const tipo = this.transactions.filter( function( elem, index, array ) {
        return elem.type === 'outcome'
    } );

    const valores = tipo.map( function( elem ) {
      return elem.value
    })

    var total = valores.reduce(function(total, numero) {
      return total + numero
    }, 0)

    return total
  }

  public getBalance(): Balance {
    const income = this.sumIncome()
    const outcome = this.sumOutcome()
    const total = income - outcome

    const balance = {
      "income": income,
      "outcome": outcome,
      "total": total
    }

    return balance
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type })

    // TRATAR ERR "should not be able to create outcome transaction without a valid balance"
    // não deve permitir que uma transação do tipo outcome extrapole o valor total que o usuário tem em caixa

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
