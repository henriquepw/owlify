import { Request, Response } from 'express';

import Gateway from '../../typeorm/entities/Gateway';

class GatewayController {
  public async index(req: Request, res: Response): Promise<Response> {
    const gateways = await Gateway.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'locate'],
    });

    return res.json(gateways);
  }

  public async store(req: Request, res: Response): Promise<Response> {
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

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const gateway = (await Gateway.findByPk(id)) as Gateway;

    if (gateway.user_id !== req.userId) {
      return res.status(401).json({ error: 'This gateway is not yours' });
    }

    const { locate } = await gateway.update(req.body);

    return res.json({ locate });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const gateway = (await Gateway.findByPk(id)) as Gateway;

    if (gateway.user_id !== req.userId) {
      return res.status(401).json({ error: 'This gateway is not yours' });
    }

    const gatewayDeleted = await Gateway.destroy({
      where: { id },
    });

    return res.json({ deleted: gatewayDeleted });
  }
}

export default new GatewayController();
