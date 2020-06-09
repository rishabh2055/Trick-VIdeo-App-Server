import {Sequelize} from 'sequelize';
import fs from 'fs';
import path from 'path';
const env = process.env.NODE_ENV || "development";
const dbConfig = require('../config/db.config')[env];
const basename = path.basename(__filename);
const folderPath = path.join(path.dirname(__dirname), 'server', 'models');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAlisas: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});

const db = {};

fs
  .readdirSync(folderPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    if(file !== 'index.js'){
      const model = sequelize['import'](path.join(folderPath, file));
      db[model.name] = model;
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
