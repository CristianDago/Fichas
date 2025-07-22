import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as Sentry from "@sentry/react";
import {
  DecodedToken,
  UseDecodeTokenResult,
} from "../../interface/hooks/decode.token.props";

export const useDecodeToken = (
  initialToken: string | null
): UseDecodeTokenResult => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeToken = (token: string | null): DecodedToken | null => {
    if (!token) {
      setUserId(null);
      setEmail(null);
      setError(null);
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.uid || null);
      setEmail(decoded.email || null);
      setError(null);
      return decoded;
    } catch (err) {
      const error = err as Error;
      Sentry.captureException(error);
      setUserId(null);
      setEmail(null);
      setError(
        "Error al decodificar el token. El token podría ser inválido o corrupto."
      );
      return null;
    }
  };

  useEffect(() => {
    decodeToken(initialToken);
  }, [initialToken]);

  return { userId, email, error, decodeToken };
};
