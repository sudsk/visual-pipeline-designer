/**
 * Dataform Code Generator
 * 
 * Generates Dataform SQL code from pipeline nodes
 */

import { DataVaultStructure, Hub, Link, Satellite } from '@/types/pipeline';

/**
 * Generate Dataform config
 */
export function generateDataformConfig(projectId: string, dataset: string) {
  return {
    defaultProject: projectId,
    defaultDataset: dataset,
    defaultLocation: 'US',
    assertionSchema: 'dataform_assertions',
  };
}

/**
 * Generate Hub SQL
 */
export function generateHubSQL(hub: Hub): string {
  const businessKeyColumns = hub.businessKeys.map(key => `    ${key}`).join(',\n');
  const hashKey = `MD5(CONCAT(${hub.businessKeys.join(", '_', ")}))`;
  
  return `config {
  type: "table",
  schema: "raw_vault",
  description: "Hub table for ${hub.name}"
}

SELECT DISTINCT
    ${hashKey} AS ${hub.name}_hk,
${businessKeyColumns},
    CURRENT_TIMESTAMP() AS load_date,
    '${hub.source}' AS record_source
FROM \${ref("${hub.source}")}
WHERE ${hub.businessKeys[0]} IS NOT NULL`;
}

/**
 * Generate Link SQL
 */
export function generateLinkSQL(link: Link): string {
  const hubHashKeys = link.hubs.map(h => `${h}_hk`);
  const hashKey = `MD5(CONCAT(${hubHashKeys.join(", '_', ")}))`;
  
  return `config {
  type: "table",
  schema: "raw_vault",
  description: "Link table for ${link.name}"
}

SELECT DISTINCT
    ${hashKey} AS ${link.name}_hk,
${hubHashKeys.map(hk => `    ${hk}`).join(',\n')},
    CURRENT_TIMESTAMP() AS load_date,
    'source' AS record_source
FROM \${ref("source_table")}`;
}

/**
 * Generate Satellite SQL
 */
export function generateSatelliteSQL(satellite: Satellite): string {
  const parentKey = `${satellite.parent}_hk`;
  const attributes = satellite.attributes.map(attr => `    ${attr.name}`).join(',\n');
  const hashDiff = `MD5(CONCAT(${satellite.attributes.map(a => a.name).join(", '_', ")}))`;
  
  return `config {
  type: "table",
  schema: "raw_vault",
  description: "Satellite table for ${satellite.name}"
}

SELECT
    ${parentKey},
    ${hashDiff} AS hash_diff,
${attributes},
    CURRENT_TIMESTAMP() AS load_date,
    CURRENT_TIMESTAMP() AS load_end_date,
    'source' AS record_source
FROM \${ref("source_table")}`;
}

/**
 * Generate PIT table SQL
 */
export function generatePITTableSQL(pitName: string, hub: string, satellites: string[]): string {
  return `config {
  type: "table",
  schema: "business_vault",
  description: "Point-in-Time table for ${pitName}"
}

SELECT
    h.${hub}_hk,
    h.load_date AS snapshot_date,
${satellites.map(sat => `    s_${sat}.* EXCEPT(${hub}_hk, load_date)`).join(',\n')}
FROM \${ref("${hub}")} h
${satellites.map(sat => `LEFT JOIN \${ref("${sat}")} s_${sat} ON h.${hub}_hk = s_${sat}.${hub}_hk`).join('\n')}`;
}

/**
 * Generate complete Dataform project from Data Vault structure
 */
export function generateDataformProject(structure: DataVaultStructure, projectId: string, dataset: string) {
  const files: Record<string, string> = {};
  
  // dataform.json
  files['dataform.json'] = JSON.stringify(generateDataformConfig(projectId, dataset), null, 2);
  
  // Hub files
  structure.hubs.forEach(hub => {
    files[`definitions/${hub.name}.sqlx`] = generateHubSQL(hub);
  });
  
  // Link files
  structure.links.forEach(link => {
    files[`definitions/${link.name}.sqlx`] = generateLinkSQL(link);
  });
  
  // Satellite files
  structure.satellites.forEach(satellite => {
    files[`definitions/${satellite.name}.sqlx`] = generateSatelliteSQL(satellite);
  });
  
  return files;
}

/**
 * Generate validation SQL
 */
export function generateValidationSQL(tableName: string, rules: any[]): string {
  const assertions = rules.map(rule => `
    -- ${rule.name}
    ASSERT (
      SELECT COUNT(*) = 0
      FROM \${ref("${tableName}")}
      WHERE NOT (${rule.rule})
    ) AS "${rule.name}"`).join(',\n');
  
  return `config {
  type: "assertion",
  description: "Data quality checks for ${tableName}"
}

${assertions}`;
}
