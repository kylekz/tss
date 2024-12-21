import { defineMiddleware, getCookie } from "vinxi/http";

// in reality this would check token validity, refresh it, set new cookie, handle redirects etc
export default defineMiddleware({
  onRequest: async (event) => {
    getCookie(event, "token");

    event.context.auth = {
      success: true,
      profile: {
        nickname: "Kairu",
        address: "0xcaB3C85ac8f4aE0153B7cF2Bbf1378397890848b",
      },
    };
  },
});
