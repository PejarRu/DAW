module.exports = (sequelize, Sequelize) => {

    let Libro = sequelize.define('libros', {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        editorial: {
            type: Sequelize.STRING
        }
    });
    
    return Libro;
};