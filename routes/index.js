const express = require("express");
const router = express.Router();

const User = require('../model/schemas/users.js');

//////////////////
// show all users /// // link localhost:3000/
//////////////////

router.get("/", (req, res, next) => {
	User.find({}, (err, user) => {
		if (err) throw err;
		res.json(200, user);
	});
});

/////////////////////
// show user by id ///// link localhost:3000/5a591ce1cb240a37c2616095
/////////////////////
router.get('/user/:id', function (req, res, next) {
	User.findById(req.params.id, (err, user) => {
		if (user) {
			res.json(200, user);
		} else {
			res.json(404, {msg: "User not found"})
		}
	});
});

//////////////////
// add user    ///link localhost:3000/add
//////////////////
router.post("/add", (req, res, next) => {
	if (req.body.name && req.body.surname) {
		let newUser = new User(req.body);
		newUser.save().then(() => {
			res.json(200, {msg: 'Users list save to database'})
		}).catch((err) => {
			console.log(err);
		});
	} else {
		res.json(204, {msg: "Users name and surname is a required"})
	}
});

/////////////////////////
// update  user by id   //////link localhost:3000/update/user/5a591ce1cb240a37c2616095
////////////////////////
router.put("/update/user/:id", (req, res, next) => {
	if(req.body.length){
		User.findById(req.params.id, (err, user) => {
			if (user) {
				user.set(req.body);
				user.save(function (err, updatedUser) {
					if (err) console.log(err);
					res.json(200, updatedUser);
				});
			} else {
				res.json(204, {msg: "User not found"})
			}
		});
	}else{
		res.json(204, {msg: "What you want to change "})
	}
});


/////////////////////////
// delet  user by id   /// ////link localhost:3000/delete/user/5a591ce1cb240a37c2616095
////////////////////////


router.delete("/delete/user/:id", (req, res, next) => {
	User.findById(req.params.id, (err, user) => {
		if (user) {
			user.remove((err) => {
				if (err) throw err;
				res.json(200, {msg:"User removed" });
			});
		} else {
			res.json(404, {msg:"User not found" });
		}

	});
});






module.exports = router;