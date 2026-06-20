export const getHealthStatus = () => {
  return {
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  };
};