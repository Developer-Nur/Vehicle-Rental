import nodeCron from "node-cron";
import app from "./app";
import config from "./config";
import cron from "node-cron";
import { bookingService } from "./modules/booking/booking.service";

const port = config.port;

cron.schedule("0 0 * * *", async () => {
  await bookingService.autoReturnExpiredBookings();
});

app.listen(port, () => {
  console.log(`Vehicle Rental Server on port ${port}`);
});
