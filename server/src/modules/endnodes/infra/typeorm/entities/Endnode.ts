import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('endnodes')
class Endnode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'gateway_id' })
  gatewayId: string;

  @Column()
  name: string;

  @Column()
  room: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Endnode;
