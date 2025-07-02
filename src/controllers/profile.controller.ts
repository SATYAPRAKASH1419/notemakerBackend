import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { prisma } from "../utils/prisma";

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getProfileDetails = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });

    if (!getProfileDetails) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        error: "User not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Profile fetched successfully",
      profile: {
        id: getProfileDetails.id,
        fname: getProfileDetails.fname,
        lname: getProfileDetails.lname,
        email: getProfileDetails.email,
      },
    });
    return;
  } catch (error) {
    console.log("Error while Fetching User profile :", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Error while fetching profile details",
    });
    return;
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  try {
    const updatedProfile = await prisma.user.update({
      where: { id: req.userId },
      data: {
        fname: data.fname,
        lname: data.lname,
      },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Profile Updated Successfully",
      profile: {
        id: req.userId,
        email: updatedProfile.email,
        fname: updatedProfile.fname,
        lname: updatedProfile.lname,
      },
    });
    return;
  } catch (error) {
    console.log("Error while updating user profile :", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Error while updating profile details",
    });
    return;
  }
};
