import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, default: null, unique: true })
  name: string;

  @Column({ /* length: 255, */ default: null })
  phone: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
