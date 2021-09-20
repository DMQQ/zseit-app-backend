import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      "http://zseit.wiki",
      "http://localhost:3000", // prod only
    ],
  });
  app.use(helmet());
  await app.listen(8000);
}
bootstrap();
