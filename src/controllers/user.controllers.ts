import { Request, Response } from "express";
import { get_users } from "../services/user.services";
import { handleHttp } from "../utils/error.handle";

const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await get_users();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR GET USERS");
  }
};

export { getUsers };