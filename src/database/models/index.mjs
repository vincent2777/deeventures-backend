import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dbConfig from '../../config/dbConfig.mjs';
import { fileURLToPath } from 'url';  // Import the required function from 'url' module

// Get the current file's path and basename
const __filename = fileURLToPath(import.meta.url);  // Convert the URL to a file path
const __dirname = path.dirname(__filename);  // Get the directory name from the file path

const basename = path.basename(__filename);
const env = process.env.APP_NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically import models using import() and handle async imports
const modelPromises = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-4) === '.mjs' &&  // Handle .mjs files specifically
      file.indexOf('.test.js') === -1
    );
  })
  .map(async (file) => {
    const modelPath = path.join(__dirname, file);
    const model = (await import(modelPath)).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Wait for all models to be loaded
await Promise.all(modelPromises);

// Set associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export db using ES module default export
export default db;
