const { sequelize } = require('./db/models');
require("dotenv").config();

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  console.log("SCHEMA: ", process.env.SCHEMA);
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});