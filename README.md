# fcc-nodejs-store-api

## Features
    - Static filter: Action for get products by field(name, featured, ...)
    - Dynamic filter for get products: /api/v1/products?name=


## Search products
``` js
GET http://localhost:5000/api/v1/products?query
```
## Search
| Parameter         | Description                                                  |Type
| ------            | -----------                                                  |------------------------------
| query             | full-text query.                                             | String
| fields            | Filter on a specific tag. Available tags:                    | String
| numericFilters    | Filters on a specific numerical condition (<, <=, =. >, >= ).| String


| Parameter         | Description                                                  |Type
| ------            | -----------                                                  |------------------------------
| fields            | featured: true or false.                                     | Boolean
|                   | company: nameCompany                                         | String
|                   | name: nameProduct                                            | String
| numericFilters    | Filters on a specific numerical condition (<, <=, =. >, >= ).| String