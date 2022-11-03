module.exports = (sequelize, Sequelize) => {

    let Artista = sequelize.define('artistas', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nacionalidad: {
            type: Sequelize.INTEGER
        }
    });
    
    return Artista;
};