import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

/*
index: listagem completa
show: listagem única
create: criar registro
update: atualizar registro
delete: deletar registro
*/
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController;

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;

// Service Pattern
// Repository Pattern (Data Mapper)