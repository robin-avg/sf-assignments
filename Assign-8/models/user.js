module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        contact: {
            type: DataTypes.INTEGER
        },
        role: {
            type: DataTypes.ENUM,
            values: ['superadmin', 'admin', 'subscriber']
        }
    });
    User.associate = function (models) {
        User.hasOne(models.Customer, {
            onDelete: "cascade"
        });
    };
    return User;
};
