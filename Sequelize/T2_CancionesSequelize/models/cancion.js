module.exports = (sequelize, Sequelize) => {

    let Cancion = sequelize.define('canciones', {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        duracion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        album: {
            type: Sequelize.STRING
        }
    });
    
    return Cancion;
};