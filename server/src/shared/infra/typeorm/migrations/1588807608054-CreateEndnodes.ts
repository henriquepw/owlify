import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEndnodes1588807608054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const endnodes = new Table({
      name: 'endnodes',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'gateway_id',
          type: 'uuid',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'room',
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
    });

    await queryRunner.createTable(endnodes);

    await queryRunner.createForeignKey(
      endnodes,
      new TableForeignKey({
        name: 'EndnodeGateway',
        columnNames: ['gateway_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'gateways',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('endnodes', 'EndnodeUser');

    await queryRunner.dropTable('endnodes');
  }
}
