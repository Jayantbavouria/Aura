
import { agentsInsertSchema } from '@/module/agents/schemas';
import {z} from 'zod';
export const meetingsInsertSchema=z.object({
    name:z.string().min(1,{message:'Name is required'}),
    agentId:z.string().min(1,{message:'Agent is required'}),
    scheduledAt:z.string().min(1,{message:'Scheduled date is required'}),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
    id: z.string().min(1, { message: "ID is required" }),
});