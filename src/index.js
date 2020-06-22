// para poder arrancar la app, archivo principal

// require('dotenv').config(); // no me lo traigo todo sino el config de ese servicio
require('./database');
const app = require('./server');

app.listen(app.get('port'), () => {
    console.log('Server on port' , app.get('port'));
});

 