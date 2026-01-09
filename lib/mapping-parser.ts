/**
 * Mapping File Parser
 * 
 * Parse Excel/CSV mapping files into pipeline structures
 */

import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export interface MappingRow {
  sourceTable: string;
  sourceColumn: string;
  sourceType: string;
  targetTable: string;
  targetColumn: string;
  targetType: string;
  transformation?: string;
  businessKey?: boolean;
}

/**
 * Parse Excel file
 */
export async function parseExcelFile(file: File): Promise<MappingRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        const mappings = json.map((row: any) => ({
          sourceTable: row['Source Table'] || row['source_table'] || '',
          sourceColumn: row['Source Column'] || row['source_column'] || '',
          sourceType: row['Source Type'] || row['source_type'] || '',
          targetTable: row['Target Table'] || row['target_table'] || '',
          targetColumn: row['Target Column'] || row['target_column'] || '',
          targetType: row['Target Type'] || row['target_type'] || '',
          transformation: row['Transformation'] || row['transformation'] || '',
          businessKey: row['Business Key'] === 'Y' || row['business_key'] === true,
        }));
        
        resolve(mappings);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}

/**
 * Parse CSV file
 */
export async function parseCSVFile(file: File): Promise<MappingRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const mappings = results.data.map((row: any) => ({
          sourceTable: row['Source Table'] || row['source_table'] || '',
          sourceColumn: row['Source Column'] || row['source_column'] || '',
          sourceType: row['Source Type'] || row['source_type'] || '',
          targetTable: row['Target Table'] || row['target_table'] || '',
          targetColumn: row['Target Column'] || row['target_column'] || '',
          targetType: row['Target Type'] || row['target_type'] || '',
          transformation: row['Transformation'] || row['transformation'] || '',
          businessKey: row['Business Key'] === 'Y' || row['business_key'] === 'true',
        })).filter((row: MappingRow) => row.sourceTable); // Filter empty rows
        
        resolve(mappings);
      },
      error: reject,
    });
  });
}

/**
 * Infer Data Vault structure from mappings
 */
export function inferDataVaultStructure(mappings: MappingRow[]) {
  // Group by target table
  const tableGroups = mappings.reduce((acc, row) => {
    if (!acc[row.targetTable]) {
      acc[row.targetTable] = [];
    }
    acc[row.targetTable].push(row);
    return acc;
  }, {} as Record<string, MappingRow[]>);
  
  const hubs: any[] = [];
  const satellites: any[] = [];
  const links: any[] = [];
  
  // Identify hubs (tables with business keys)
  Object.entries(tableGroups).forEach(([tableName, rows]) => {
    const businessKeys = rows.filter(r => r.businessKey).map(r => r.targetColumn);
    
    if (businessKeys.length > 0) {
      hubs.push({
        name: `hub_${tableName.toLowerCase()}`,
        businessKeys,
        source: rows[0].sourceTable,
      });
      
      // Create satellite for descriptive attributes
      const attributes = rows
        .filter(r => !r.businessKey)
        .map(r => ({
          name: r.targetColumn,
          dataType: r.targetType,
          nullable: true,
        }));
      
      if (attributes.length > 0) {
        satellites.push({
          name: `sat_${tableName.toLowerCase()}_details`,
          parent: `hub_${tableName.toLowerCase()}`,
          parentType: 'hub',
          attributes,
        });
      }
    }
  });
  
  return {
    hubs,
    links,
    satellites,
  };
}

/**
 * Validate mapping data
 */
export function validateMappings(mappings: MappingRow[]): string[] {
  const errors: string[] = [];
  
  mappings.forEach((row, idx) => {
    if (!row.sourceTable) {
      errors.push(`Row ${idx + 1}: Missing source table`);
    }
    if (!row.sourceColumn) {
      errors.push(`Row ${idx + 1}: Missing source column`);
    }
    if (!row.targetTable) {
      errors.push(`Row ${idx + 1}: Missing target table`);
    }
    if (!row.targetColumn) {
      errors.push(`Row ${idx + 1}: Missing target column`);
    }
  });
  
  return errors;
}

/**
 * Generate sample mapping template
 */
export function generateMappingTemplate(): any[] {
  return [
    {
      'Source Table': 'customers',
      'Source Column': 'customer_id',
      'Source Type': 'INT64',
      'Target Table': 'customer',
      'Target Column': 'customer_id',
      'Target Type': 'INT64',
      'Transformation': '',
      'Business Key': 'Y',
    },
    {
      'Source Table': 'customers',
      'Source Column': 'customer_name',
      'Source Type': 'STRING',
      'Target Table': 'customer',
      'Target Column': 'customer_name',
      'Target Type': 'STRING',
      'Transformation': '',
      'Business Key': 'N',
    },
    {
      'Source Table': 'customers',
      'Source Column': 'email',
      'Source Type': 'STRING',
      'Target Table': 'customer',
      'Target Column': 'email_address',
      'Target Type': 'STRING',
      'Transformation': 'LOWER(email)',
      'Business Key': 'N',
    },
  ];
}
