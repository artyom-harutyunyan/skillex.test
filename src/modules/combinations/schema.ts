import z from 'zod';

export const schema = z.object({
  items: z.array(z.number()),
  length: z.number(),
});

export type IBody = z.infer<typeof schema>;
