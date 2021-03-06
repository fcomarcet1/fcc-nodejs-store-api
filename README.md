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
| ------            | -----------                                                  |---------
| query=            | full-text query.                                             | String
| fields=           | Filter on a specific tag. Available tags:                    | String
| numericFilters    | Filters on a specific numerical condition (<, <=, =. >, >= ).| String
| limit=            | Filter return number of items
| page=             | Page number                                                  | Integer


| Parameter         | Description                                                  |Type
| ------            | -----------                                                  |-----------
| fields            | featured: true or false.                                     | Boolean
|                   | company: nameCompany                                         | String
|                   | name: nameProduct                                            | String
| sort              |                                                              | String
| numericFilters    | Filters on a specific numerical condition (<, <=, =. >, >= ).| String

EXAMPLES
``` js
    {{URL}}/products?sort=-price
    {{URL}}/products?sort=-name,price&field=company&limit=10
    {{URL}}/products?sort=name,&fields=name, price&limit=3&page=2
    {{URL}}/products?numericFilters=price>30
    {{URL}}/products?numericFilters=price>30&sort=price
```