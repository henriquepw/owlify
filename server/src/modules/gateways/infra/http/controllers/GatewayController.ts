import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateGatewayService from '@modules/gateways/services/CreateGatewayService';
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
    const { location } = req.body;

    const createGateway = container.resolve(CreateGatewayService);

    const gateway = await createGateway.execute({
      userId: req.user.id,
      location,
    });

    return res.json(gateway);
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
