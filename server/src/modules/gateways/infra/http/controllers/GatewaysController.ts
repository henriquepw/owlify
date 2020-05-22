import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGatewayService from '@modules/gateways/services/CreateGatewayService';
import ListUserGatewaysService from '@modules/gateways/services/ListUserGatewaysService';
import DeleteGatewayService from '@modules/gateways/services/DeleteGatewayService';
import UpdateGatewayService from '@modules/gateways/services/UpdateGatewayService';

class GatewaysController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUserGateways = container.resolve(ListUserGatewaysService);

    const gateways = await listUserGateways.execute(req.user.id);

    return res.json(gateways);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { location } = req.body;

    const createGateway = container.resolve(CreateGatewayService);

    const gateway = await createGateway.execute({
      ownerId: req.user.id,
      location,
    });

    return res.json(gateway);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { gatewayId, location } = req.body;

    const updateGateway = container.resolve(UpdateGatewayService);

    const gateway = await updateGateway.execute({
      ownerId: req.user.id,
      gatewayId,
      location,
    });

    return res.json(gateway);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteGateway = container.resolve(DeleteGatewayService);

    const { gatewayId } = req.body;

    await deleteGateway.execute({
      ownerId: req.user.id,
      gatewayId,
    });

    return res.status(204).send();
  }
}

export default new GatewaysController();
