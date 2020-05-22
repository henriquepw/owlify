import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGatewayEndnodesService from '@modules/endnodes/services/ListGatewayEndnodesService';

class GatewayEndnodesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { gatewayId } = req.params;

    // TODO: pagination and item limit per query
    // const { page = 1, limit = 20 } = req.query;
    // const offset = (page - 1) * limit;

    const listGatewayEndnodes = container.resolve(ListGatewayEndnodesService);

    const endnodes = await listGatewayEndnodes.execute(gatewayId);

    return res.json(endnodes);
  }
}

export default new GatewayEndnodesController();
