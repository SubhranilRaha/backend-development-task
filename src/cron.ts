import cron from "node-cron";
import { syncEmbeddings } from "./controllers/manual.controller";

cron.schedule("* * */1 * * *", syncEmbeddings, {
  timezone: "Asia/Kolkata",
});
