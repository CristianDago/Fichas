import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  uid?: string;
  email?: string;
  exp?: number;
}

export interface UseDecodeTokenResult {
  userId: string | null;
  email: string | null;
  error: string | null;
  decodeToken: (token: string | null) => DecodedToken | null;
}
