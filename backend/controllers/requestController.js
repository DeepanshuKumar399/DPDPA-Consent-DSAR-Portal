import { createRequest, getUserRequests } from '../services/requestService.js';

export const create = async (req, res) => {
  const request = await createRequest(req.user._id, req.body);
  res.status(201).json(request);
};

export const getMyRequests = async (req, res) => {
  const requests = await getUserRequests(req.user._id);
  res.json(requests);
};
