module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNUll: false
        },
        customer_website: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customer_address: {
            type: DataTypes.STRING
        }
    });
    Customer.associate = function (models) {
        Customer.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Customer;
};
