module.exports = (sequelize, Sequelize) => {

    let Autor = sequelize.define('autores', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nacimiento: {
            type: Sequelize.INTEGER
        }
    });
    
    return Autor;
};