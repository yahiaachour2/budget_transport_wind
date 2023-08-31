const Joi = require("joi");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


const register = async (req, res) => {
  const { username, email, password ,Role} = req.body;
  if (!username || !email || !password|| !Role) {
    return res.status(400).json({
      success: false,
      message: "messing data",
      data: [],
    });
  }
  const existingUser = await db.User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "user already exist",
      data: [],
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedPassword");
    const user = await db.User.create({
      username: username,
      Role:Role,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "servor error",
      data: [],
    });
  }
};
const login = async (req, res) => {
    try{
        const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });
    if(!user){
        res.status(400).json({error:'employee introuvable'});
        return;
            }   
     const same = await bcrypt.compare(password,user.password)
            if(!same){
                res.status(400).json({error:'invalid password'});
                return;
                }
                const token = jwt.sign({Role:user.Role},'secret_key');
                return res.status(200).json({token:token});
            }catch(error) {
              console.log(error)
        return res.status(500).json({
          success: false,
          message: "servor error"
        });
      }
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'benalii.2001@gmail.com',
        pass: 'ozsm wpua pdix lszg'
      }
    });
    

    const sendResetPasswordEmail = async (email, resetToken) => {
      const link = `http://localhost:3000/reset-password/${resetToken}`
      const mailOptions = {
        from: 'benalii.2001@gmail.com',
        to: email,
        subject: 'Réinitialisation de mot de passe',
        html: `<p>Hello ${email},</p>
                    <h3>You requested for password reset</h3>
                    <h4>Click on this button <a href="${link}"><button>Reset</button></a> to reset password.</h4>
                    `,
    };
    
    
      await transporter.sendMail(mailOptions);
    };



    const resetPassword = async (req, res) => {
      try {
        const { resetToken, password } = req.body;

        const user = await db.User.findOne({ where: { resetToken: resetToken } });
    
        if (!user) {
          return res.status(400).json({ error: 'Jeton de réinitialisation invalide' });
        }
    
        if (user.resetTokenExpiration < Date.now()) {
          return res.status(400).json({ error: 'Le jeton de réinitialisation a expiré' });
        }
        // Réinitialiser le mot de passe de l'utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        await user.save();
    
        return res.status(200).json({ success: true, message: 'Mot de passe réinitialisé avec succès' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Erreur lors de la réinitialisation du mot de passe' });
      }
    };

    const forgetpassword = async (req, res) => {
        try {
          const { email } = req.body; 
          const user = await db.User.findOne({ where: { email: email } });
      
          if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
          }
      
          const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          const resetTokenExpiration = new Date(Date.now() + 3600000); 
      
          user.resetToken = resetToken;
          user.resetTokenExpiry = resetTokenExpiration;
          await user.save();
          await sendResetPasswordEmail(user.email, resetToken);

          return res.status(200).json({ success: true, message: "Email sent avec succeés" });
        } catch (error) {
          console.log(error)
          return res.status(500).json({ success: false, message: "Erreur lors de la réinitialisation du mot de passe" });
        }
      };
      



module.exports = { register,login, forgetpassword,resetPassword };
