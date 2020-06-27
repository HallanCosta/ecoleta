import { Request, Response} from 'express';
import knex from '../database/connection';

class ItemsControllers {
  
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    //serialized é o processo de tradução de estruturas de 
    //dados ou estado de objeto em um formato.
    //A reconstrução de um objeto no mesmo ambiente(backend),
    //ou, reconstrução de um objeto em outro ambiente(mobile).
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.1.105:3333/uploads/${item.image}`,
      };
    }); 

    return response.json(serializedItems);
  }

}

export default ItemsControllers;