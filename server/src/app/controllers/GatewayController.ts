import { Request, Response } from 'express';

import Gateway from '../models/Gateway';

class GatewayController {
  async index(req: Request, res: Response) {
    const gateways = await Gateway.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'locate'],
    });

    return res.json(gateways);
  }

  async store(req: Request, res: Response) {
    const { locate } = req.body as Gateway;
    const { userId: user_id } = req;

    const { id } = await Gateway.create({
      locate,
      user_id,
    });

    return res.json({
      id,
      locate,
      user_id,
    });
  }
}

export default new GatewayController();
