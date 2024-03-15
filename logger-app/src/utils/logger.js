export class ConsoleLogger {
  log(message, ...optionalParams) {
    console.log(message, ...optionalParams);
  }
  warn(message, ...optionalParams) {
    console.warn(message, ...optionalParams);
  }
  error(message, ...optionalParams) {
    console.error(message, ...optionalParams);
  }
}
