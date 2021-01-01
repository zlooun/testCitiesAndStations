import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Stations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, default: null, unique: true })
  name: string;

  @Column({ length: 255, default: null })
  city: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
