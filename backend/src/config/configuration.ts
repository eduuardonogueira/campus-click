export default () => ({
  port: parseInt(process.env.BACKEND_PORT ?? '25893', 10),
});
