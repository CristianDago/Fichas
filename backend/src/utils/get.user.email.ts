import { User } from "../models/user.model";

export const getUserEmail = async (userId: string): Promise<string | null> => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user) {
      return user.email;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
