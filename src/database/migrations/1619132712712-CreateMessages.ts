import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { stringify } from "uuid";

export class CreateMessages1619132712712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
              name:"messages",
              columns:[
                  {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                  },
                  {
                    name: "admin_id",
                    type: "varchar",
                    isNullable: true,
                  },
                  {
                    name: "user_id",
                    type: "uuid",
                  },
                  {
                    name: "text",
                    type: "varchar",
                  },
                  {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                  },
              ],
              foreignKeys:[{
                name: 'FKUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
              }]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("messages");
    }

}
