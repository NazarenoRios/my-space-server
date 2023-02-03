import User from "../models/User";

const get_users = async () => {
  const users = await User.findAll();
  return users;
};

export { get_users };