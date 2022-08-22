export const prepareHeaders = () => {
  const reqHeader = new Headers();
  reqHeader.append("x-client-secret", process.env.NEXT_PUBLIC_CROSSMINT_API_KEY);
  reqHeader.append("x-project-id", process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID);
  reqHeader.append("Content-Type", "application/json");
  return reqHeader
}