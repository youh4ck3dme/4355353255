'use server';

/**
 * @fileOverview An AI agent that generates a project structure with readme files, previews, and cover images.
 *
 * - generateProjectStructure - A function that handles the project structure generation.
 * - GenerateProjectStructureInput - The input type for the generateProjectStructure function.
 * - GenerateProjectStructureOutput - The return type for the generateProjectStructure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectStructureInputSchema = z.object({
  fileDescriptions: z.array(
    z.object({
      filename: z.string().describe('The name of the file.'),
      dataUri: z
        .string()
        .describe(
          "The file's content as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    })
  ).describe('A list of files to be included in the project structure.'),
  projectName: z.string().describe('The name of the project.'),
});
export type GenerateProjectStructureInput = z.infer<typeof GenerateProjectStructureInputSchema>;

const GenerateProjectStructureOutputSchema = z.object({
  projectStructure: z.string().describe('The generated project structure, including readme files, previews, and cover images.'),
});
export type GenerateProjectStructureOutput = z.infer<typeof GenerateProjectStructureOutputSchema>;

export async function generateProjectStructure(input: GenerateProjectStructureInput): Promise<GenerateProjectStructureOutput> {
  return generateProjectStructureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectStructurePrompt',
  input: {schema: GenerateProjectStructureInputSchema},
  output: {schema: GenerateProjectStructureOutputSchema},
  prompt: `You are an AI project structurer. Given a set of files, you will generate a project structure, including readme files, previews, and cover images, to help users quickly organize and visualize their projects.

Project Name: {{{projectName}}}

Files:
{{#each fileDescriptions}}
  - Filename: {{{filename}}}
{{/each}}
`,
});

const generateProjectStructureFlow = ai.defineFlow(
  {
    name: 'generateProjectStructureFlow',
    inputSchema: GenerateProjectStructureInputSchema,
    outputSchema: GenerateProjectStructureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
