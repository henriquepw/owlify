import { Request, Response } from 'express';

class SensorsController {
  public async index(req: Request, res: Response): Promise<Response> {
    // const { endnodeId } = req.params;
    // const { page = 1, limit = 20, all } = req.query;

    return res.json({});
  }

  public async store(req: Request, res: Response): Promise<Response> {
    // const { endnodeId } = req.params;
    // const { snr, rssi, temperature, humidity, count } = req.body;

    const measurement = {};

    return res.json(measurement);
  }
}

export default new SensorsController();
