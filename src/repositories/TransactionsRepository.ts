import Transaction from '../models/Transaction';

interface CreateTransaction {
    title: string
    value: number
    type: 'income' | 'outcome'
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

  summation(typeTransaction: string) {
    const tipo = this.transactions.filter( function( elem, index, array ) {
        return elem.type === typeTransaction
    } );

    const valores = tipo.map( function( elem ) {
      return elem.value
    })

    var total = valores.reduce(function( sum, value ) {
      return sum + value
    }, 0)

    return total
  }

  public getBalance(): Balance {
    const income = this.summation('income')
    const outcome = this.summation('outcome')
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

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
