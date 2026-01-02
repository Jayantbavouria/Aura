import { agentsRouter } from '@/module/agents/server/procedures';
import {  createTRPCRouter } from '../init';
import { meetingsRouter } from '@/module/meeting/server/procedures';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;