export default interface ICreatePacketDTO {
  endnodeId: string;
  fields: {
    snr: number;
    rssi: number;
    count: number;
    success: boolean;
  };
}
