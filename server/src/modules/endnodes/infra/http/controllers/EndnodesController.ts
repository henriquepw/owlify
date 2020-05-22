import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEndnodeService from '@modules/endnodes/services/CreateEndnodeService';
import DeleteEndnodeService from '@modules/endnodes/services/DeleteEndnodeService';

import ListUserEndnodesService from '@modules/endnodes/services/ListUserEndnodesService';
import UpdateEndnodeService from '@modules/endnodes/services/UpdateEndnodeService';

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { name, room } = req.body;

    const updateEndnode = container.resolve(UpdateEndnodeService);

    const endnode = await updateEndnode.execute({
      ownerId: req.user.id,
      endnodeId,
      name,
      room,
    });

    return res.json(endnode);
  }

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
