const jwtConfig = {
  SECRET_KEY: process.env.JWT_SECRET || "arthur_basilio_kallany_gretchen_1234",
  EXPIRES_IN: "1h"
};

export default jwtConfig;