import app from './app';

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line
  console.log(`[SYSTEM] System is running on port ${process.env.APP_PORT}`);
});
