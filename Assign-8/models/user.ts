
module.exports = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define("User", {
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

    User.associate = (models: any) => {
        User.hasOne(models.Customer, {
            onDelete: "cascade"
        });
    };

    return User;
}