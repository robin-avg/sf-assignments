module.exports = (sequelize: any, DataTypes: any) => {
    const Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customer_website: {
            type: DataTypes.STRING,
        },
        customer_address: {
            type: DataTypes.STRING
        }
    });

    Customer.associate = (models: any) => {
        Customer.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Customer;
}