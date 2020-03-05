import request from 'supertest';

describe('End-node', () => {
  describe('GET /endnodes', () => {
    it.todo('should get a list of all user end-nodes');
  });

  describe('GET /endnodes/:gatewayId', () => {
    it.todo("should get a list of all end-nodes of a user's gateway");
  });

  describe('POST /endnodes', () => {
    it.todo('shoud be able to registe a end-node');
  });

  describe('PUT /endnodes/:id', () => {
    it.todo('should be able to update a end-node data by id');

    it.todo('should not be able to update a end-node that is not yours');
  });

  describe('DELETE /endnodes/:id', () => {
    it.todo('should be able to delete a end-node');

    it.todo('should not be able to delete a end-node if not yours');
  });
});
