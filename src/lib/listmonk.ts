const listmonkUrl = process.env.NEXT_PUBLIC_LISTMONK_URL?.replace(/\/$/, "");
const listUuid = process.env.NEXT_PUBLIC_LISTMONK_LIST_UUID;

export type SubscribeResult =
  | { ok: true; pendingConfirmation: boolean }
  | { ok: false; message: string };

export function isListmonkConfigured(): boolean {
  return Boolean(listmonkUrl && listUuid);
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  if (!listmonkUrl || !listUuid) {
    return {
      ok: false,
      message: "Newsletter signup is not configured yet.",
    };
  }

  const response = await fetch(`${listmonkUrl}/api/public/subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      list_uuids: [listUuid],
    }),
  });

  let payload: { message?: string; data?: { has_optin?: boolean } } = {};
  try {
    payload = await response.json();
  } catch {
    // Non-JSON error responses are handled below.
  }

  if (!response.ok) {
    return {
      ok: false,
      message: payload.message ?? "Something went wrong. Please try again.",
    };
  }

  return {
    ok: true,
    pendingConfirmation: payload.data?.has_optin ?? false,
  };
}
