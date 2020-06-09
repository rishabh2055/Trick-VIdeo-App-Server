export const production = {
  HOST: 'ec2-34-200-72-77.compute-1.amazonaws.com',
  USER: 'tpadeuidqmleno',
  PASSWORD: '798a897c15455089ccbe7586093ffd7f675ce2881b125ac5cc5f7b5efb8664fa',
  DB: 'd79k12rho7pl6o',
  dialect: "postgres",
  pool: { // pool is optional, it will be used for Sequelize connection pool configuration
    max: 5, // maximum number of connection in pool
    min: 0, // minimum number of connection in pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000  // maximum time, in milliseconds, that a connection can be idle before being released
  }
};

export const development = {
  HOST: 'localhost',
  USER: 'trickappadmin',
  PASSWORD: 'Tr!cK@@P@Dm!N',
  DB: 'trickdb',
  dialect: "postgres",
  pool: { // pool is optional, it will be used for Sequelize connection pool configuration
    max: 5, // maximum number of connection in pool
    min: 0, // minimum number of connection in pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000  // maximum time, in milliseconds, that a connection can be idle before being released
  }
};

