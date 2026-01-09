/**
 * Anthropic API Integration
 * 
 * Functions for interacting with Claude API
 */

import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;

if (!apiKey) {
  console.warn('NEXT_PUBLIC_ANTHROPIC_API_KEY is not set');
}

const anthropic = new Anthropic({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Only for development
});

/**
 * Send a chat message to Claude
 */
export async function sendChatMessage(message: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: message,
      }],
    });
    
    const textContent = response.content.find(block => block.type === 'text');
    return textContent && 'text' in textContent ? textContent.text : 'No response';
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw error;
  }
}

/**
 * Generate Data Vault structure from mapping
 */
export async function generateDataVault(mappingData: any): Promise<any> {
  try {
    const prompt = `Analyze this data mapping and generate a Data Vault 2.0 structure.

Mapping Data:
${JSON.stringify(mappingData, null, 2)}

Generate:
1. Hubs (business keys)
2. Links (relationships)
3. Satellites (descriptive attributes)

Return as JSON with this structure:
{
  "hubs": [{ "name": "hub_customer", "businessKeys": ["customer_id"], "source": "crm" }],
  "links": [{ "name": "link_customer_order", "hubs": ["hub_customer", "hub_order"], "relationshipType": "1:N" }],
  "satellites": [{ "name": "sat_customer_details", "parent": "hub_customer", "parentType": "hub", "attributes": [...] }]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });
    
    const textContent = response.content.find(block => block.type === 'text');
    if (textContent && 'text' in textContent) {
      // Extract JSON from response
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    throw new Error('Failed to parse Data Vault structure');
  } catch (error) {
    console.error('Data Vault generation error:', error);
    throw error;
  }
}

/**
 * Generate DQ rules for a table
 */
export async function generateDQRules(tableName: string, columns: any[]): Promise<any[]> {
  try {
    const prompt = `Generate data quality rules for this table:

Table: ${tableName}
Columns: ${JSON.stringify(columns, null, 2)}

Generate DQ rules like:
- NOT NULL checks for key fields
- Range checks for numeric fields
- Format validation for dates/emails
- Referential integrity checks

Return as JSON array:
[
  { "name": "customer_id_not_null", "rule": "customer_id IS NOT NULL", "severity": "error" },
  ...
]`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });
    
    const textContent = response.content.find(block => block.type === 'text');
    if (textContent && 'text' in textContent) {
      const jsonMatch = textContent.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    return [];
  } catch (error) {
    console.error('DQ rules generation error:', error);
    return [];
  }
}

/**
 * Suggest optimizations for a pipeline
 */
export async function suggestOptimizations(pipelineData: any): Promise<any[]> {
  try {
    const prompt = `Analyze this data pipeline and suggest optimizations:

${JSON.stringify(pipelineData, null, 2)}

Suggest improvements for:
- Performance (clustering, partitioning)
- Cost (storage format, lifecycle)
- Quality (validation, monitoring)

Return as JSON array with suggestions.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });
    
    const textContent = response.content.find(block => block.type === 'text');
    if (textContent && 'text' in textContent) {
      const jsonMatch = textContent.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    return [];
  } catch (error) {
    console.error('Optimization suggestions error:', error);
    return [];
  }
}
