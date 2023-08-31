module.exports=(sequelize,DataTypes) =>{
    const Product=sequelize.define("Product",{
      type:{
        type:DataTypes.ENUM("debit","credit")
      },
      description:{
          type:DataTypes.STRING,
          allowNull:false
      },
      montant:{
          type:DataTypes.INTEGER,
          allowNull:false
      },
      soldeActuel:{
        type:DataTypes.FLOAT,
    },

    })
    Product.associate=models=>{
      Product.belongsTo(models.User,{
          onDelete:"cascade"
      })

    }
    return Product
  }