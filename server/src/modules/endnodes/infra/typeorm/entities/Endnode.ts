import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';

@Entity('endnodes')
class Endnode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'gateway_id' })
  gatewayId: string;

  @ManyToOne(() => Gateway)
  @JoinColumn({ name: 'gateway_id' })
  gateway: Gateway;

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
