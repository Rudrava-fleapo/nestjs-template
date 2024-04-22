import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateEnv<T extends object>(
  config: Record<string, unknown>,
  configClass: new () => T,
): T {
  const finalConfig = plainToInstance(configClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  if (errors.length) {
    throw new Error(
      `Please provide valid ENVs\n ${JSON.stringify(
        Object.fromEntries(errors.map((e) => [e.property, e.constraints])),
        null,
        2,
      )}`,
    );
  }

  return finalConfig;
}
