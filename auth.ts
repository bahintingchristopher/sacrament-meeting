import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';

const AuthUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.email(),
  passwordHash: z.string().min(1),
});

const AuthUsersSchema = z.array(AuthUserSchema);

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

function getAuthUsers() {
  const raw = process.env.AUTH_USERS_JSON;

  if (!raw) {
    return [];
  }

  try {
    const parsed = AuthUsersSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = parsed.data.email.toLowerCase();
        const user = getAuthUsers().find(
          (candidate) => candidate.email.toLowerCase() === email,
        );

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
