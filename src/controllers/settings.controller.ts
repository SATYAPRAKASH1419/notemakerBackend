import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { HTTP_STATUS } from '../constants/httpStatus';

const allowedThemes = ['light', 'dark', 'system'] as const;
type Theme = (typeof allowedThemes)[number];

export const changeTheme = async (req: Request, res: Response): Promise<void> => {
  const { theme } = req.body;

  if (!allowedThemes.includes(theme)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'Invalid theme value. Allowed: "light", "dark", "system".',
    });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.userId, 
      },
      data: {
        theme: theme as Theme, 
      },
    });

    res.status(HTTP_STATUS.OK).json({
      message: `Theme updated to ${theme} successfully!`,
      theme: updatedUser.theme,
    });
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong while updating theme.',
    });
  }
};
