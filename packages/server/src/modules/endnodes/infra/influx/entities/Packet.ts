export default interface IPacket {
  endnodeId: string;
  snr: number;
  rssi: number;
  count: number;
  success: boolean;
  time: string;
}
