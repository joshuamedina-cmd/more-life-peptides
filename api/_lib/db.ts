import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;
export function sql() {
  if (!_sql) {
    const url = process.env.MORELIFE_DATABASE_URL;
    if (!url) throw new Error("MORELIFE_DATABASE_URL is not set");
    _sql = neon(url);
  }
  return _sql;
}

export async function logEvent(invoiceNumber: string | null, source: string, eventType: string, detail: unknown, externalEventId?: string) {
  const rows = (await sql()`
    INSERT INTO ml_events (invoice_number, source, event_type, external_event_id, detail)
    VALUES (${invoiceNumber}, ${source}, ${eventType}, ${externalEventId ?? null}, ${JSON.stringify(detail ?? {})}::jsonb)
    ON CONFLICT (external_event_id) DO NOTHING
    RETURNING id`) as any[];
  return rows.length > 0; // false = duplicate external event
}
