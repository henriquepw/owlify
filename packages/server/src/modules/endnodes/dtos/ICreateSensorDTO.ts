export default interface ICreateSensorDTO {
  endnodeId: string;
  fields: {
    humidity: number;
    temperature: number;
    snr: number;
    rssi: number;
    count: number;
  };
}
