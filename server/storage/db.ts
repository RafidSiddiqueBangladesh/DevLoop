import fs from 'fs';
import path from 'path';

type AnyRecord = Record<string, any>;

const dataDir = path.join(__dirname, '..', 'data');

function ensureDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function collectionPath(name: string) {
  ensureDir();
  return path.join(dataDir, `${name}.json`);
}

export function readCollection<T = AnyRecord[]>(name: string): T {
  const file = collectionPath(name);
  if (!fs.existsSync(file)) {
    // initialize with empty array
    fs.writeFileSync(file, JSON.stringify([], null, 2), 'utf-8');
  }
  const raw = fs.readFileSync(file, 'utf-8');
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    // recover from corrupt file
    return [] as unknown as T;
  }
}

export function writeCollection(name: string, data: AnyRecord[] | AnyRecord) {
  const file = collectionPath(name);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

export function upsertById(name: string, record: AnyRecord) {
  const data = readCollection<AnyRecord[]>(name);
  const idx = data.findIndex((d) => d.id === record.id);
  if (idx >= 0) {
    data[idx] = { ...data[idx], ...record };
  } else {
    data.push(record);
  }
  writeCollection(name, data);
  return record;
}

export function removeById(name: string, id: string) {
  const data = readCollection<AnyRecord[]>(name);
  const next = data.filter((d) => d.id !== id);
  writeCollection(name, next);
}

export function findById<T = AnyRecord>(name: string, id: string): T | undefined {
  const data = readCollection<AnyRecord[]>(name);
  return data.find((d) => d.id === id) as T | undefined;
}

export function findOne<T = AnyRecord>(name: string, predicate: (r: AnyRecord) => boolean): T | undefined {
  const data = readCollection<AnyRecord[]>(name);
  return data.find(predicate) as T | undefined;
}

export function query<T = AnyRecord[]>(name: string, predicate: (r: AnyRecord) => boolean): T {
  const data = readCollection<AnyRecord[]>(name);
  return data.filter(predicate) as unknown as T;
}