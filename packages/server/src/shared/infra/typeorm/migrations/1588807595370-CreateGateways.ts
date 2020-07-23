import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGateways1588807595370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const gateway = new Table({
      name: 'gateways',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'owner_id',
          type: 'uuid',
        },
        {
          name: 'location',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'GatewayUser',
          columnNames: ['owner_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    });

    await queryRunner.createTable(gateway);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gateways');
  }
}
