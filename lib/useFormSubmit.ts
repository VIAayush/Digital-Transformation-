"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SITE } from "./site";

type Status = "idle" | "loading" | "error";

/**
 * Mirrors the submission flow of the existing site: payload is posted as
 * URLSearchParams to the Google Apps Script endpoint (no-cors), then the
 * visitor is sent to /thank-you?form=<name>.
 */
export function useFormSubmit() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submitForm(data: Record<string, string>, formName: string) {
    setStatus("loading");
    setError(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const payload = {
        ...data,
        formName,
        submittedAt: new Date().toISOString(),
        sourceWebsite: window.location.hostname || "Viral Inbound",
        pageUrl: window.location.href,
      };
      const body = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => body.append(k, String(v)));

      await fetch(SITE.formEndpoint, {
        method: "POST",
        mode: "no-cors",
        body,
        signal: controller.signal,
      });

      // Fire a GTM event so existing conversion tracking keeps working.
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: "form_submit", formName });

      router.push(`/thank-you?form=${encodeURIComponent(formName)}`);
      return true;
    } catch (err) {
      console.error("Form Submission Error:", err);
      setStatus("error");
      setError("Something went wrong. Please try again, or email hello@viralinbound.com.");
      return false;
    } finally {
      clearTimeout(timer);
    }
  }

  return { submitForm, status, error, loading: status === "loading" };
}
