export default () => ({
  port: parseInt(process.env.BACKEND_PORT ?? '3001', 10),
});
