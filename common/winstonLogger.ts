import * as winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
const logtail = new Logtail("FuwTZJMusRXn9nzUofcqojVh");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.align()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
    new LogtailTransport(logtail),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});
export default logger;
