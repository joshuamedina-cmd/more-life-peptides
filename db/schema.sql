-- MoreLife ledger (Neon project morelife-ledger). MoreLife books only.
CREATE TABLE IF NOT EXISTS ml_customers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  square_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- The invoice number is the one customer-facing reference. Square IDs are stored behind it.
CREATE TABLE IF NOT EXISTS ml_invoices (
  invoice_number TEXT PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES ml_customers(id),
  status TEXT NOT NULL DEFAULT 'created'
    CHECK (status IN ('created','sent','partially_paid','paid','partially_refunded','refunded','canceled','failed')),
  subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  shipping_cents INTEGER NOT NULL CHECK (shipping_cents >= 0),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  amount_paid_cents INTEGER NOT NULL DEFAULT 0,
  amount_refunded_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  ship_to JSONB NOT NULL,
  square_location_id TEXT,
  square_customer_id TEXT,
  square_order_id TEXT UNIQUE,
  square_invoice_id TEXT UNIQUE,
  square_invoice_status TEXT,
  public_url TEXT,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sent_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS ml_invoice_lines (
  id BIGSERIAL PRIMARY KEY,
  invoice_number TEXT NOT NULL REFERENCES ml_invoices(invoice_number),
  sku TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount_per_vial TEXT NOT NULL,
  vials INTEGER NOT NULL CHECK (vials > 0),
  unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0),
  line_total_cents INTEGER NOT NULL CHECK (line_total_cents >= 0),
  UNIQUE (invoice_number, sku)
);
-- Every money movement is its own row (a $200 payment then a $50 refund = two rows, never one $150 row).
CREATE TABLE IF NOT EXISTS ml_transactions (
  id BIGSERIAL PRIMARY KEY,
  invoice_number TEXT NOT NULL REFERENCES ml_invoices(invoice_number),
  kind TEXT NOT NULL CHECK (kind IN ('payment','refund','dispute')),
  square_id TEXT NOT NULL,
  square_payment_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL,
  source_type TEXT,
  card_brand TEXT,
  card_last4 TEXT,
  occurred_at TIMESTAMPTZ,
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (kind, square_id)
);
-- Audit trail: every status change, webhook, sync, and error.
CREATE TABLE IF NOT EXISTS ml_events (
  id BIGSERIAL PRIMARY KEY,
  invoice_number TEXT,
  source TEXT NOT NULL,
  event_type TEXT NOT NULL,
  external_event_id TEXT UNIQUE,
  detail JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ml_invoices_status_idx ON ml_invoices(status);
CREATE INDEX IF NOT EXISTS ml_transactions_invoice_idx ON ml_transactions(invoice_number);
CREATE INDEX IF NOT EXISTS ml_events_invoice_idx ON ml_events(invoice_number);
