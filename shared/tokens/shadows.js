/**
 * Tasty Recipes Shared Shadow & Elevation Tokens
 */

export const shadows = {
  sm: {
    web: "0 2px 8px rgba(72, 44, 31, 0.04)",
    mobile: {
      shadowColor: "#482c1f",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
  },
  md: {
    web: "0 8px 24px rgba(72, 44, 31, 0.06)",
    mobile: {
      shadowColor: "#482c1f",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
  },
  lg: {
    web: "0 18px 45px rgba(116, 67, 45, 0.1)",
    mobile: {
      shadowColor: "#482c1f",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 8,
    },
  },
  primary: {
    web: "0 8px 20px rgba(231, 111, 81, 0.28)",
    mobile: {
      shadowColor: "#e76f51",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.28,
      shadowRadius: 14,
      elevation: 6,
    },
  },
};

export default shadows;
