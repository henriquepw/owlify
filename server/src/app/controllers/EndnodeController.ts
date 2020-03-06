import { Request, Response } from 'express';
import Endnode from '../models/Endnode';
import Gateway from '../models/Gateway';

class EndnodeController {
  async store(req: Request, res: Response) {
    const { room, name } = req.body as Endnode;
    const { gatewayId } = req.params;

    /**
     * Check if gateway not exists
     */
    const isGatewayExists = await Gateway.findByPk(gatewayId);

    if (!isGatewayExists) {
      return res.status(401).json({ error: 'Gateway id is invalid' });
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

    const endnode = (await Endnode.findByPk(id)) as Endnode;

    const { room, name } = await endnode?.update(req.body);

    return res.json({
      room,
      name,
    });
  }
}

export default new EndnodeController();
