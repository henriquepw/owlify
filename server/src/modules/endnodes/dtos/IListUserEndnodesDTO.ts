export default interface IListUserEndnodesDTO {
  ownerId: string;
  options?: {
    limit?: number;
    page?: number;
    all?: boolean;
  };
}
