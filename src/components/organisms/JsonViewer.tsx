import React from "react";
import { Copy } from "lucide-react"; // Using lucide-react for icon
import Toaster from '../atoms/Toaster'
import styles from "./JsonViewer.module.css"; // Add necessary styles
import { useClipboard } from "../../util";

interface JsonViewerProps {
  liveJson: object;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ liveJson }) => {
  const { isCopied, copyToClipboard } = useClipboard();

  return (
    <div className={styles.jsonContainer}>
      <div className={styles.header}>
        <h3>Live JSON Output</h3>
        <button
          className={styles.copyButton}
          onClick={() => copyToClipboard(JSON.stringify(liveJson, null, 2))}
          title="Copy JSON"
        >
          <Copy size={18} />
        </button>
      </div>

      <pre>{JSON.stringify(liveJson, null, 2)}</pre>

      {/* Toaster Notification */}
      <Toaster message="Copied to clipboard!" visible={isCopied} />
    </div>
  );
};

export default JsonViewer;
