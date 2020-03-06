import { Request, Response } from 'express';
import Endnode from '../models/Endnode';
import Gateway from '../models/Gateway';
import User from '../models/User';

interface GatewayWithUser extends Gateway {
  user: User;
}

interface EndnodeWithGateway extends Endnode {
  gateway: GatewayWithUser;
}

class EndnodeController {
  async index(req: Request, res: Response) {
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

  async store(req: Request, res: Response) {
    const { room, name } = req.body as Endnode;
    const { gatewayId } = req.params;

    /**
     * Check if gateway not exists
     */
    const isGatewayExists = await Gateway.findByPk(gatewayId);

    if (!isGatewayExists) {
      return res.status(400).json({ error: 'Gateway id is invalid' });
    }

    const { id } = await Endnode.create({
      name,
      room,
      gateway_id: gatewayId,
    });

    return res.json({
      id,
      room,
      name,
    });
  }

  async update(req: Request, res: Response) {
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
    })) as EndnodeWithGateway;

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

  async delete(req: Request, res: Response) {
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
    })) as EndnodeWithGateway;

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
