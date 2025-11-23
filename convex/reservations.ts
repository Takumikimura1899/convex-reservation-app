import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const list = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('reservations')
      .withIndex('by_date', (q) => q.eq('date', args.date))
      .collect();
  },
});

export const create = mutation({
  args: {
    customerName: v.string(),
    date: v.string(),
    startTime: v.string(),
  },
  handler: async (ctx, args) => {
    // Check for existing reservation
    const existing = await ctx.db
      .query('reservations')
      .withIndex('by_date', (q) => q.eq('date', args.date))
      .filter((q) => q.eq(q.field('startTime'), args.startTime))
      .first();

    if (existing && existing.status === 'active') {
      throw new Error('This slot is already booked.');
    }

    await ctx.db.insert('reservations', {
      customerName: args.customerName,
      date: args.date,
      startTime: args.startTime,
      status: 'active',
    });
  },
});

export const cancel = mutation({
  args: { id: v.id('reservations') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: 'cancelled' });
  },
});
