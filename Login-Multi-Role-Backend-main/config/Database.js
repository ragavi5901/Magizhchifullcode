import { Sequelize } from "sequelize";

const db = new Sequelize('magizhchi','root','Harshan@23',{
    host:"localhost",
    dialect:"mysql"
})

export default db;


