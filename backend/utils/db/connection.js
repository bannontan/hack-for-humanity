import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./users.sqlite",
	logging: console.log,
});

export default sequelize;
