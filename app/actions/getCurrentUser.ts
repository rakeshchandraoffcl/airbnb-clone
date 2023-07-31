import { getServerSession } from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import { authOtions } from '@/pages/api/auth/[...nextauth]';

// Return current session
export const getSession = async () => {
  return await getServerSession(authOtions);
};

// Return current user
const getCurrentUser = async () => {
  // Get Current session
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) return null;
  return {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null,
  };
};

export default getCurrentUser;
