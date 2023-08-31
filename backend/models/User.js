module.exports=(sequelize,DataTypes) =>{
  const User=sequelize.define("User",{
    username:{
         type:DataTypes.STRING,
         allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Role:{
        type:DataTypes.ENUM("admin","employee"),
    },
    resetToken: {
      type:DataTypes.STRING,
      allowNull:true
    },
    resetTokenExpiry: {
      type:DataTypes.DATE,
      allowNull:true
    },
  })
  User.associate=models=>{
    User.hasMany(models.Product,{
        onDelete:"cascade"
    })
  }
  return User
}
