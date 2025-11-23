import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  reservations: defineTable({
    customerName: v.string(),
    date: v.string(), // YYYY-MM-DD
    startTime: v.string(), // HH:mm
    status: v.union(v.literal('active'), v.literal('cancelled')),
  }).index('by_date', ['date']),
});
