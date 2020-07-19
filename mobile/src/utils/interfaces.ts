export interface Gateway {
  id: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Endnode {
  id: string;
  name: string;
  room: string;
  createdAt: string;
  updatedAt: string;
  gatewayId: string;
}

export interface SensorsData {
  time: string;
  endnodeId: string;
  humidity: number;
  temperature: number;
}
