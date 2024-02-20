import {NetologyService} from "@/services/NetologyService";
import { netology } from '@/config/services';

const netologyService = new NetologyService();

export const login = () => netologyService.login(netology.user);
export const getSchedule = () => netologyService.getSchedule();