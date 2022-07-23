//post : Creating request
//get : Reading request
//put : Updating request
//delete : Deleting request


const express = require('express');  //Import Express
const Joi = require('joi');			 //Import Joi	
const app=express();	//Create Express Application on the app variable
app.use(express.json());  //use the json file cuz it has the data 

//Give data to the server

const customers = [
 
	{title: 'George', id: 1},
	{title: 'Josh', id: 2},
	{title: 'Tylor', id: 3},
	{title: 'Alice', id: 4},
	{title: 'Candice', id: 5},

]

//Read request Handlers
//Display the message when the url consist of '/'


app.get('/', (req, res) => {     //req in this case will be the url localhost:8080/    This can be tried out in postman for testing
	res.send('Welcome to Demo for REST API');
});

//Display the list of Customers when URL consists of api customers
app.get('/api/customers', (req, res) => {	  //req in this case will be the url localhost:8080/api/customers
res.send(customers);

});

//Display the information of Specific customer when you mention the id.
app.get('/api/customers/ :id', (req, res) => {       //req in this case will be the url localhost:8080/api/customers/3   (3 is the cust id)

	const customer = customers.find(c => c.id === parseInt(req.params.id));
	//if there is no valid customer id, then display an error with the following

	if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred; ">OOPS.. cant find what you are looking for</h2>')
	res.send(customer);

});


//Create Request Handler
//Create new Customer Information
app.post('/api/customers' , (req, res) => {


 const { error } = validateCustomer(req.body) ;

 if(error){
 	res.status(400).send(error.details[0].message)
 	return;
 }

 //Increment the customer id

 const customer = {
 	id: customers.length + 1,
 	title: req.body.title
 };

customers.push(customer);
res.send(customer);

});




//Update Request Handler
//Update Existing Customer Information
app.put('/api/customers/ :id', (req, res) => {
	const customer = customers.find(c => c.id === parseInt(req.params.id));
	if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred; ">OOPS.. cant find what you are looking for</h2>')
	
	 const { error } = validateCustomer(req.body) ;

 	if(error){
 	res.status(400).send(error.details[0].message)
 	return;
}

customer.title = req.body.title;
res.send(customer);

});



//Delete Request Handler
//Delete Customer Details
app.delete('/api/customers/ :id', (req, res) => {
const customer = customers.find(c => c.id === parseInt(req.params.id));
	if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred; ">OOPS.. cant find what you are looking for</h2>')

	const index = customers.indexOf(customer);
	customers.splice(index, 1);

	res.send(customer);
});


//Validate Inforamtion
function validateCustomer(customer){
	const schema = {
		title: Joi.string().min(3).required()
	};
	return Joi.validate(customer, schema);
}


//Port Environment Variable

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}.. `));


