const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Routes = express.Router();
const Razorpay = require('razorpay')
const shortid = require('shortid')
const PORT = 4000;
const DB_NAME = "delphi"

var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 12;

const razorpay = new Razorpay({
	key_id: 'rzp_test_JrEBDNsKWKMAXB',
	key_secret: 'zvpwH2dUhTkvGX0eY6qBVFpA'
})

let User = require("./models/User");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

app.get('/logo.jpeg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.jpeg'))
})
app.post('/verification', (req, res) => {
	// do a validation
	const secret = '99999999'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 499
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

Routes.route("/").get(function(req, res){
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

Routes.route("/register").post(function(req, res) {
    console.log(req);
    let user = new User(req.body);
    User.findOne({ username: req.body.username }, function(err, users) {
        bcrypt.hash(req.body.password, 10, (err,hash) => {
            if(err && err) res.status(400).send(err);
            else
            {
                if (users) {
                    res.status(200).send("1");
                }
                else if(!users)
                {
                    user.password = hash;
                    console.log("New user");
                    var use = 400;
                    user.save()
                    .then(user => {
                        res.status(201).json({ User: "User added successfully" });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });
                }
                
            }
        });
    });
});

// Login
Routes.route("/login").post(function(req, res) {
    console.log(req.body);
    const  email=req.body.email;
    const password= req.body.password; 
    let response = {
        val: "",
        type: ""
    };
    var check = 0;
     if (!req.body.email || !req.body.password) {
        response.val = 0;
        check = 1;
        res.json(response);
    }
    if(check==0) {
	    User.findOne({ email : email },
	    (err,user)=>{
	        if(err)
	        {
	            console.log(err);
	            res.status(500).json({ erros: err });
	        }
	        else
	        {
                var reso = 1;
	            if(!user) {
                     //Not found
	                    console.log("Not registered");
	                    response.val = reso;
	                    res.json(response);
	            }

	            else
	            {
	                bcrypt.compare(req.body.password, user.password,function (err, result){
                        if (err && err) throw err;
                        var temp = 0;
                        console.log(req.body.password, result);
                        if (result)
                        {
	                        currentuser = req.body.email;
                            response.val = 3;
                            temp = 1;
                            response.type = user.type;
                            res.json(response);
	                    }
	                    if(temp==0)
	                    {
	                    	response.val = 2;
                            res.json(response);
	                    }
	                });
	            }
	        }
	    });
	}
});





app.use("/", Routes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
