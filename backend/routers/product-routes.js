const express = require('express');
const route = express.Router();
const db = require('../models');
const nodemailer = require('nodemailer');

//last solde
async function findLastProduct() {
  try {
    const lastProduct = await db.Product.findOne({
      order: [['createdAt', 'DESC']],
    });

    return lastProduct;
  } catch (error) {
    throw error;
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'benalii.2001@gmail.com',
    pass: 'ozsm wpua pdix lszg',
  },
});

const sendEmail = async (email) => {
  const mailOptions = {
    from: 'benalii.2001@gmail.com',
    to: email,
    subject: 'Limite de solde atteinte',
    html: `<p>Salut ${email},</p>
           <h3>Le solde a atteint sa limite</h3>
          `,
  };

  await transporter.sendMail(mailOptions);
};

// Usage in your route handler
route.post('/createproduct', async (req, res, next) => {
  const { type, description, montant, UserId } = req.body;

  if (type !== 'debit' && type !== 'credit') {
    return res
      .status(400)
      .json({ message: "Le type doit être 'debit' ou 'credit'" });
  }

  try {
    const user = await db.User.findByPk(UserId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const lastProduct = await findLastProduct();

    const lastSoldeActuel = lastProduct ? lastProduct.soldeActuel : 0;

    let newSoldeActuel;
    if (type === 'debit') {
      newSoldeActuel = lastSoldeActuel - parseInt(montant);
    } else if (type === 'credit') {
      newSoldeActuel = lastSoldeActuel + parseInt(montant);
    }

    console.log("============= lastSoldeActuel", lastSoldeActuel);
    console.log("============= montant", montant);
    console.log("============= lastSoldeActuel", typeof(lastSoldeActuel));
    console.log("============= montant", typeof(montant));
    const product = await db.Product.create({
      type: type,
      description: description,
      montant: montant,
      soldeActuel: newSoldeActuel,
      UserId: UserId,
    });

    if (montant > lastSoldeActuel) {
      const admin = await db.User.findOne({ where: { Role: 'admin' } });

      if (admin) {
        const adminEmail = admin.email;
        await sendEmail(adminEmail);
      } else {
        console.error('Administrateur non trouvé');
      }
    }

    res.status(201).json(product);
  } catch (error) {
    console.error('Erreur lors de la création du produit :', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la création du produit' });
  }
});

// get one product
route.get('/product/:id', (req, res, next) => {
  db.Product.findOne({ where: { id: req.params.id }, include: [db.User] })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

// get all products
route.get('/products', (req, res, next) => {
  db.Product.findAll({ include: [db.User] })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = route;
