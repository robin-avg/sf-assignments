const express = require('express');

const router = express.Router();

const db = require('../models');

//POST USERS IN DATABASE
router.post('/users/add', async (req: any, res: any) => {
    const newUser = await db.User.create({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        role: req.body.role
    })

    res.send(newUser);
});
//GET ALL USERS WITH THEIR PARTICULAR CUSTOMER
router.get('/users/list', (req: any, res: any) => {
    db.User.findAll({
        include: [db.Customer]
    }).then((getUsers: any) => res.send(getUsers));

});
//ADD CUSTOMERS 
router.post('/customers/new', async (req: any, res: any) => {
    const newCustomer = await db.Customer.create({
        customer_name: req.body.customer_name,
        customer_website: req.body.customer_website,
        customer_address: req.body.customer_address,
        UserId: req.body.UserId
    })
    //  console.log(newCustomer);
    res.send(newCustomer);
});
//GET CUSTOMERS BY ID
router.get("/find/:id", async (req: any, res: any) => {
    const listCustomer = await db.Customer.findAll({
        where: { UserId: req.params.id },
        include: [db.User]
    });
    res.send(listCustomer);
})
//DELETE BY ID
router.delete("/delete/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        await db.User.destroy({
            where: { id: id }
        });
        await db.Customer.destroy({
            where: { id: id }
        });
        res.json("deleted");
    } catch (e) {
        res.json(e.message);
    }
})
//UPDATE BY ID
router.put("/update/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const updatedUser = await db.User.update({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            role: req.body.role
        }, {
            where: { id: id }
        });
        const updatedCustomer = await db.Customer.update({
            customer_name: req.body.customer_name,
            customer_website: req.body.customer_website,
            customer_address: req.body.customer_address
        }, {
            where: { UserId: id }
        })
        res.json("Sucessfully updated");
    } catch (e) {
        res.json(e.message);
    }

})
module.exports = router;