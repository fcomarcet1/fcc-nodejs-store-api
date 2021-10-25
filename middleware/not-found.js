('use strict');

const notFound = (req, res) => {
    console.log('👓👓 Activated Middleware -> not found !!');
    res.status(404).send("Route does not exist");
}

module.exports = notFound;
