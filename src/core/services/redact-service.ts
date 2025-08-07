import csv from 'csv-parser';
import { Readable, Writable } from 'stream';
import { stringify } from 'csv-stringify/sync';

export class RedactService {
    /**
   * Redact the csv data
   * @param csv data
   * @returns redacted csv data
   */
  public static redactCSV(csvInput: string): Promise<string> {
    // List of PII fields to redact (case-insensitive)
    const PII_FIELDS = ['FIRST NAME', 'LAST NAME', 'ACCOUNT HOLDER', 'ACCOUNT NUMBER', 'ADDRESS', 'CARD NUMBER'];
    const rows: Record<string, string>[] = [];
    const piiFieldSet = new Set(PII_FIELDS.map(f => f.toUpperCase()));

    return new Promise((resolve, reject) => {
        Readable.from([csvInput])
        .pipe(csv())
        .on('data', (row: Record<string, string>) => {
            const redactedRow: Record<string, string> = {};
            for (const key in row) {
            redactedRow[key] = piiFieldSet.has(key.toUpperCase()) ? '[REDACTED]' : row[key];
            }
            rows.push(redactedRow);
        })
        .on('end', () => {
            const output = stringify(rows, { header: true });
            resolve(output);
        })
        .on('error', reject);
    });
        
  }

}