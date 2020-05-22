import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEndnodeService from '@modules/endnodes/services/CreateEndnodeService';
import DeleteEndnodeService from '@modules/endnodes/services/DeleteEndnodeService';

import ListUserEndnodesService from '@modules/endnodes/services/ListUserEndnodesService';

class EndnodesController {
  public async index(req: Request, res: Response): Promise<Response> {
    // TODO: pagination and item limit per query
    // const { page = 1, limit = 20 } = req.query;
    // const offset = (page - 1) * limit;

    const listUserEndnodes = container.resolve(ListUserEndnodesService);

    const endnodes = await listUserEndnodes.execute(req.user.id);

    return res.json(endnodes);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { room, name, gatewayId } = req.body;

    const createEndnode = container.resolve(CreateEndnodeService);

    const endnode = await createEndnode.execute({
      gatewayId,
      name,
      room,
    });

    return res.json(endnode);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const endnode = (await Endnode.findByPk(id, {
  //     include: [
  //       {
  //         model: Gateway,
  //         as: 'gateway',
  //         attributes: ['id'],
  //         include: [
  //           {
  //             model: User,
  //             as: 'user',
  //             attributes: ['id'],
  //           },
  //         ],
  //       },
  //     ],
  //   })) as IEndnodeWithGateway;

  //   /**
  //    * Check if end-node not exists
  //    */
  //   if (!endnode) {
  //     return res.status(400).json({ error: 'the end-node not exists' });
  //   }

  //   /**
  //    * Check if user id not matches with logged user
  //    */
  //   if (req.userId !== endnode.gateway.user.id) {
  //     return res.status(401).json({ error: 'the end-node is not yours' });
  //   }

  //   const { room, name } = await endnode.update(req.body);

  //   return res.json({
  //     room,
  //     name,
  //   });
  // }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;

    const deleteEndnode = container.resolve(DeleteEndnodeService);

    await deleteEndnode.execute({
      ownerId: req.user.id,
      endnodeId,
    });

    return res.status(204).send();
  }
}

export default new EndnodesController();
