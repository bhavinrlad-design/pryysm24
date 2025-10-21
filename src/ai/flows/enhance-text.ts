'use server';

/**
 * @fileOverview An AI flow for enhancing text descriptions.
 *
 * - enhanceText - A function that takes a text and returns an improved version.
 * - EnhanceTextInput - The input type for the enhanceText function.
 * - EnhanceTextOutput - The return type for the enhanceText function.
 */

import { ai } from '../../ai/genkit';
import { z } from 'zod';

const EnhanceTextInputSchema = z.object({
  text: z.string().describe('The text to be enhanced.'),
});
export type EnhanceTextInput = z.infer<typeof EnhanceTextInputSchema>;

const EnhanceTextOutputSchema = z.object({
  enhancedText: z.string().describe('The enhanced, professional version of the text.'),
});
export type EnhanceTextOutput = z.infer<typeof EnhanceTextOutputSchema>;

export async function enhanceText(input: EnhanceTextInput): Promise<EnhanceTextOutput> {
  const result = await enhanceTextFlow(input);
  return result as EnhanceTextOutput;
}

type FlowConfig = {
  name: string;
  inputSchema: any;
  outputSchema: any;
};

const enhanceTextFlow = ai.defineFlow(
  {
    name: 'enhanceTextFlow',
    inputSchema: EnhanceTextInputSchema,
    outputSchema: EnhanceTextOutputSchema,
  } as FlowConfig,
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

const prompt = ai.definePrompt({
  name: 'enhanceTextPrompt',
  input: { 
    jsonSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The text to be enhanced'
        }
      },
      required: ['text']
    }
  },
  output: { 
    jsonSchema: {
      type: 'object',
      properties: {
        enhancedText: {
          type: 'string',
          description: 'The enhanced, professional version of the text'
        }
      },
      required: ['enhancedText']
    }
  },
  prompt: `You are an expert copywriter. Enhance the following product description for clarity, detail, and professionalism. Rewrite it to be compelling for a quotation or invoice.

Original text: {{{text}}}
`,
});


