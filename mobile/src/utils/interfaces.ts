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
