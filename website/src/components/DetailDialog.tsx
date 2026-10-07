import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export default function DetailDialog({
  title,
  children,
  onClose,
  routeKey,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  routeKey: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected && trigger !== document.body)
        trigger.focus({ preventScroll: true });
      else
        document
          .querySelector<HTMLElement>('.top-navigation a[href="#/"]')
          ?.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    dialog.current?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, [routeKey]);
  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Tab") {
      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (
          document.activeElement === first ||
          document.activeElement === heading.current ||
          !dialog.current?.contains(document.activeElement)
        ) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }
  return (
    <dialog
      ref={dialog}
      className="detail-dialog"
      aria-labelledby="detail-title"
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) {
          const rect = dialog.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-toolbar">
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close detail"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="dialog-content">
        <h1 ref={heading} tabIndex={-1} id="detail-title">
          {title}
        </h1>
        {children}
      </div>
    </dialog>
  );
}
