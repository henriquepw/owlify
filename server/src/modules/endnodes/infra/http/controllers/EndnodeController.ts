import { Request, Response } from 'express';
import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';

import CreateEndnodeService from '@modules/endnodes/services/CreateEndnodeService';

import Endnode from '../../typeorm/entities/Endnode';

interface IGatewayWithUser extends Gateway {
  user: User;
}

interface IEndnodeWithGateway extends Endnode {
  gateway: IGatewayWithUser;
}

class EndnodeController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 20 } = req.query;

    const offset = (page - 1) * limit;

    const endnodes = await Endnode.findAll({
      where: {
        gateway_id: req.params.gatewayId,
      },
      limit,
      offset,
      attributes: ['gateway_id', 'id', 'room', 'name'],
    });

    return res.json(endnodes);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 20 } = req.query;

    const offset = (page - 1) * limit;

    const gateways = await Gateway.findAll({
      where: {
        user_id: req.userId,
      },
    });

    const gatewaysIds = gateways.map(({ id }) => id);

    const endnodes = await Endnode.findAll({
      where: {
        gateway_id: gatewaysIds,
      },
      limit,
      offset,
      attributes: ['gateway_id', 'id', 'room', 'name'],
    });

    return res.json(endnodes);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { room, name } = req.body as Endnode;
    const { gatewayId } = req.params;

    const createEndnode = container.resolve(CreateEndnodeService);

    const endnode = await createEndnode.execute({
      gatewayId,
      name,
      room,
    });

    return res.json(endnode);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const endnode = (await Endnode.findByPk(id, {
      include: [
        {
          model: Gateway,
          as: 'gateway',
          attributes: ['id'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id'],
            },
          ],
        },
      ],
    })) as IEndnodeWithGateway;

    /**
     * Check if end-node not exists
     */
    if (!endnode) {
      return res.status(400).json({ error: 'the end-node not exists' });
    }

    /**
     * Check if user id not matches with logged user
     */
    if (req.userId !== endnode.gateway.user.id) {
      return res.status(401).json({ error: 'the end-node is not yours' });
    }

    const { room, name } = await endnode.update(req.body);

    return res.json({
      room,
      name,
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const endnode = (await Endnode.findByPk(id, {
      include: [
        {
          model: Gateway,
          as: 'gateway',
          attributes: ['id'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id'],
            },
          ],
        },
      ],
    })) as IEndnodeWithGateway;

    /**
     * Check if user id not matches with logged user
     */
    if (req.userId !== endnode.gateway.user.id) {
      return res.status(401).json({ error: 'the end-node is not yours' });
    }

    const deleted = await Endnode.destroy({
      where: { id },
    });

    return res.json({
      deleted,
    });
  }
}

export default new EndnodeController();
