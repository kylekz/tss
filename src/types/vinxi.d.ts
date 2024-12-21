declare module "vinxi/http" {
  interface H3EventContext {
    auth: {
      success: true;
      profile: {
        nickname: string;
        address: string;
      };
    };
  }
}
