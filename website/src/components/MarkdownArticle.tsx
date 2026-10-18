import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownArticle({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (
          !response.ok ||
          response.headers.get("content-type")?.includes("text/html")
        )
          throw new Error("Unavailable");
        return response.text();
      })
      .then(setContent)
      .catch((error) => {
        if (error.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, [url]);
  if (failed)
    return (
      <p role="status">
        The full write-up couldn’t load. You can still explore the project using
        the link above.
      </p>
    );
  if (content === null) return <p role="status">Loading the write-up…</p>;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
        pre: ({ children, ...props }) => (
          <pre {...props} tabIndex={0}>
            {children}
          </pre>
        ),
        table: ({ children, ...props }) => (
          <div className="table-scroll">
            <table {...props}>{children}</table>
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
