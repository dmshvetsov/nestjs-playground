import { getConnection as ormGetConnection } from 'typeorm';

export const getConnection = () =>
  ormGetConnection({

  });

export const reset = () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(
      `"resetDb" is not allowed in [${process.env.NODE_ENV}] environment`,
    );
  }

  const connection = getConnection();

  const tableEntities = connection.entityMetadatas.filter(
    (entity) => entity.tableType !== 'view',
  );

  return Promise.all(
    tableEntities.map((entity) =>
      connection
        .getRepository(entity.name)
        .query(`truncate ${entity.tableName} restart identity cascade;`),
    ),
  );
};
