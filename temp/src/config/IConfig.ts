interface IServerConfig {
  devmode: string;
  port: number;
  jwtSecret: string;
  mongoURL: string;
}

export { IServerConfig };
