import { Request, Response } from 'express';

import { escape } from 'influx/lib/src/grammar/escape';
import { container } from 'tsyringe';

import influx from '@shared/infra/influx';

import WritePackageService from '@modules/endnodes/services/WritePackageService';

class PackagesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const result = await influx.query(`
        select * from package
        where endnodeId = ${escape.stringLit(endnodeId)}
        order by time desc
        limit ${limit}
        offset ${offset}
      `);

    return res.json(result);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { snr, rssi, success, count } = req.body;

    const writePackage = container.resolve(WritePackageService);

    const measurement = await writePackage.execute({
      endnodeId,
      fields: {
        snr,
        rssi,
        count,
        success,
      },
    });

    return res.json(measurement);
  }
}

export default new PackagesController();
