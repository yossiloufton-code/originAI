export function toCsv(rows: Array<Record<string, any>>, headers?: string[]): string {
  if (rows.length === 0) {
    const fallback = headers ?? ['id', 'imageId', 'type', 'createdAt'];
    return fallback.join(',') + '\n';
  }

  const cols = headers ?? Object.keys(rows[0]);

  const escape = (v: any) => {
    const s = String(v ?? '');
    if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
    return s;
  };

  const lines = [cols.join(','), ...rows.map((r) => cols.map((c) => escape(r[c])).join(','))];

  return lines.join('\n') + '\n';
}
