import { getCompleteAnalytics } from "../analytics/analyticsService.js";

export const generateBusinessReport = async (businessId) => {
  const analytics = await getCompleteAnalytics(businessId);

  return {
    generated_at: new Date().toISOString(),
    analytics,
  };
};
