import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string
  value: number
  type: string
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    const validate = this.transactionsRepository.validateTransaction(type, value)
    
    if (!validate) {
      throw Error('Transaction without a valid balance')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction
  }
}

export default CreateTransactionService;
