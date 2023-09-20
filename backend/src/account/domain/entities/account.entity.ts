import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('accounts')
@Unique(['accountNumber'])
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  accountNumber: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  balance: number;
}
