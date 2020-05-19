import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGatewayService from '@modules/gateways/services/CreateGatewayService';
import ListUserGatewaysService from '@modules/gateways/services/ListUserGatewaysService';

import DeleteGatewayService from '@modules/gateways/services/DeleteGatewayService';
import Gateway from '../../typeorm/entities/Gateway';

class GatewayController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUserGateways = container.resolve(ListUserGatewaysService);

    const gateways = await listUserGateways.execute(req.user.id);

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
    const deleteGateway = container.resolve(DeleteGatewayService);

    const { gatewayId } = req.body;

    await deleteGateway.execute({
      userId: req.user.id,
      gatewayId,
    });

    return res.status(204).send();
  }
}

export default new GatewayController();
