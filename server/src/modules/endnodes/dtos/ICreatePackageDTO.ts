export default interface ICreatePackageDTO {
  endnodeId: string;
  fields: {
    snr: number;
    rssi: number;
    count: number;
    success: boolean;
  };
}
