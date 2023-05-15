export type UserAuth = {
  userName: string;
  userId: string;
};

export type AuthenticatedUser = {
  id: string;
  userName: string;
};

export type TokenPayload = {
  sub: string;
  userName: string;
};
