export const OPEN_ASSISTANT = "ghr:open-assistant";

export function openAssistant() {
  window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT));
}

export interface ToastPayload {
  kind: "success" | "error" | "info";
  msg: string;
}

export function toast(kind: ToastPayload["kind"], msg: string) {
  window.dispatchEvent(new CustomEvent<ToastPayload>("ghr:toast", { detail: { kind, msg } }));
}
