const dbConfig = require("./db.config.js");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    freezeTableName: true,
  },
});

// TABLES
const Login = sequelize.define("login", {
  staff_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  staff_type: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  }
});

const ClientCompany = sequelize.define("client_company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
});

const ClientStaff = sequelize.define("client_staff", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING
  }
});

const Staff = sequelize.define("staff", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const Project = sequelize.define("project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const Task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  proj_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  client_staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.INTEGER,
  },
  position: {
    type: DataTypes.STRING,
  },
  due_date: {
    type: DataTypes.DATEONLY,
  },
  created_at: {
    type: DataTypes.DATE
  },
  finished_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

const VwTask = sequelize.define("vw_task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  company_id: {
    type: DataTypes.INTEGER,
  },
  company_name: {
    type: DataTypes.STRING,
  },
  proj_id: {
    type: DataTypes.INTEGER,
  },
  proj_name: {
    type: DataTypes.STRING,
  },
  proj_desc: {
    type: DataTypes.STRING,
  },
  client_staff_id: {
    type: DataTypes.INTEGER,
  },
  client_staff_name: {
    type: DataTypes.STRING,
  },
  staff_id: {
    type: DataTypes.INTEGER,
  },
  staff_firstname: {
    type: DataTypes.STRING,
  },
  staff_lastname: {
    type: DataTypes.STRING,
  },
  staff_position: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.INTEGER,
  },
  position: {
    type: DataTypes.STRING
  },
  due_date: {
    type: DataTypes.DATEONLY
  },
  created_at: {
    type: DataTypes.DATE
  },
  finished_at: {
    type: DataTypes.DATE
  },
}, {
  timestamps: false
});

module.exports = { sequelize, Login, ClientCompany, ClientStaff, Staff, Project, Task, VwTask };