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

    const { room, name } = await endnode?.update(req.body);

    return res.json({
      room,
      name,
    });
  }
}

export default new EndnodeController();
