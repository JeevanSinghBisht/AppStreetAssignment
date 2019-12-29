# Project Title

AppStreet Assignment

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

node version : v12.12.0
npm version : v6.12.0
mongodb version : v4.2.1


### Installing
    ### For Code:
        1) clone the project from github. URL : https://github.com/JeevanSinghBisht/AppStreetAssignment.git
        2) Go to root of dircetory look for package.json file;
        3) run command 
           # npm install --save OR npm i --save
        4) run command to run project.
            # npm start 
    ### For DB:
        1) Create a DB  in mongo using compass or command line.
        2) Look for iPhone_store directory inside project.
        3) Run the command 
            # mongorestore -d iPhone_store iPhone_store
        this command create collection in mongodb.


## Running the tests
    1) /list API.
        Request Type => POST,
        URL => localhost:3000/api/products/list
        raw data => {"search":"iPhone","color":["white","black"],"storage":["32GB""64GB"]}.
        NOTE : raw data is optional and also used to make combination of name,color and storage, color and storage can be multiple in the form of array.

    2) /productDetail API.
        Request Type => GET,
        URL => localhost:3000/api/products/productDetail?id=5e086d13381df6f254f1c85b&has_variant=true
        NOTE : In the first api you will get a key for each products that is has_variant. The use of has_variant is if this key is true means the products have variants if false means no variants for that product.
        Now if the key is false then you have to send th id = product_id (means the _id of product collection) otherwsie send the varaints _id. 
        


## Built With

* nodejs
* npm
* mongo, compass

 

## Authors

    Jeevan Singh Bisht
    jeevanbisht2feb@gmail.com
    8447726137

