/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllErrorMessages = (errors: Record<string, any>): string[] => {
    const messages: string[] = [];
  
    const extractMessages = (obj: Record<string, any>) => {
     if(obj)
      Object.values(obj||{}).forEach((error) => {
        if (error?.message) {
          messages.push(error.message);
        }
        if (typeof error === "object") {
          extractMessages(error); // Recursively check nested errors
        }
      });
      return []
    };
  
    extractMessages(errors);
    return messages;
  };
  

  import { useState } from "react";

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return { isCopied, copyToClipboard };
};


