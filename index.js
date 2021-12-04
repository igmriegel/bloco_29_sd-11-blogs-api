const express = require('express');

const controllers = require('./controllers');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/user', controllers.userController);
// app.use('/login', controllers);
// app.use('/categories', controllers);
// app.use('/post', controllers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
