// hooks/useDecodedToken.js
import { useMemo } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { getToken } from "../_service/auth";

export default function useDecodedToken() {
  const token = getToken();
  const decoded = useMemo(() => (token ? decodeToken(token) : null), [token]);
  const expired = useMemo(() => (token ? isExpired(token) : true), [token]);
  return { token, decoded, expired };
}
