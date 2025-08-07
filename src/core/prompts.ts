import { FastMCP } from "fastmcp";
import { z } from "zod";

/**
 * Register all prompts with the MCP server
 * @param server The FastMCP server instance
 */
export function registerPrompts(server: FastMCP) {
  // Example prompt
  server.addPrompt({
    name: "Accountant",
    description: "A prompt to analyze the bank statement transactions provided by the user.",
    arguments: [],
    load: async () => {
      return `You are an accounting tool.
      The tool will take CSV data.
      The details provided in CSV file have PII information.
      Do not pass the PII information to LLM.
      You are give a list of bank transactions in the form of csv data.
      First mask the CSV data passed and 
      then use the redacted data to classify purchases as grocery, retail etc. 
      Do not use the input CSV file data to pass to LLM`;
    }
  });
}
