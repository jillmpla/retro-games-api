import {ApplicationConfig, RetroGameApiApplication} from './application';
import {GameRepository} from './repositories';
import {Game} from './models';
import fs from 'fs';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new RetroGameApiApplication(options);
  await app.boot();
  await app.start();

  //seed the database from db.json if empty
  const repo = await app.getRepository(GameRepository);
  const count = await repo.count();

  if (count.count === 0) {
    console.log('⚡ Loading from db.json...');
    const raw = fs.readFileSync('./data/db.json', 'utf-8');
    const parsed = JSON.parse(raw).Game;
    await repo.createAll(parsed as Game[]);
  }

  const url = app.restServer.url;
  console.log(`DB is using: ./data/db.json`);
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? '127.0.0.1',
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };

  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
