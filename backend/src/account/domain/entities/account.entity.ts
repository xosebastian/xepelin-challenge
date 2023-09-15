import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { InsufficientFundsException } from '../exceptions';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  accountNumber: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  balance: number;

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new InsufficientFundsException(amount, this.balance);
    }
    this.balance -= amount;
  }
}
