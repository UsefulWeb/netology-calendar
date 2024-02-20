import 'dotenv/config';
import {getSchedule, login} from "@/actions/netology";


login()
  .then(getSchedule)
  .then(toGoogleEvent)
  // .then(console.log)
  .catch(console.error)