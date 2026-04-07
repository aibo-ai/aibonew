import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class FileStorage {
  private filePath: string;

  constructor(filename: string) {
    this.filePath = path.join(DATA_DIR, `${filename}.json`);
  }

  // Read data from file
  read(): any[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${this.filePath}:`, error);
      return [];
    }
  }

  // Write data to file
  write(data: any[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${this.filePath}:`, error);
    }
  }

  // Add new item
  add(item: any): any {
    const data = this.read();
    const newItem = {
      id: (data.length + 1).toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...item,
      content: item.content || '',
    };
    data.push(newItem);
    this.write(data);
    return newItem;
  }

  // Update existing item
  update(id: string, updates: any): any | null {
    const data = this.read();
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return null;
    }

    data[index] = {
      ...data[index],
      ...updates,
      content: updates.content || data[index].content || '',
      updated_at: new Date().toISOString()
    };
    
    this.write(data);
    return data[index];
  }

  // Delete item
  delete(id: string): boolean {
    const data = this.read();
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return false;
    }

    data.splice(index, 1);
    this.write(data);
    return true;
  }

  // Find item by ID
  findById(id: string): any | null {
    const data = this.read();
    return data.find(item => item.id === id) || null;
  }

  // Find item by slug
  findBySlug(slug: string): any | null {
    const data = this.read();
    return data.find(item => item.slug === slug) || null;
  }
}
