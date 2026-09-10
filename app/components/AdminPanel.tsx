"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { apiPath } from "../lib/basePath";

type AdminMessage = {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
};

type TabId = "messages" | "rsvps";
type RsvpView = "replies" | "headcount";

const USERNAME_DOMAIN = "wedd.space";

function toIdentity(input: string) {
  const value = input.trim();
  return value.includes("@") ? value : `${value}@${USERNAME_DOMAIN}`;
}

type AdminRsvp = {
  id: string;
  name: string;
  attending: boolean;
  party_size: number;
  note: string | null;
  created_at: string;
};

export default function AdminPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setChecked(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));

    return () => subscription.unsubscribe();
  }, []);

  if (!supabaseConfigured) {
    return (
      <Shell>
        <p className="text-[15px] leading-relaxed text-muted">
          Supabase isn&apos;t configured. Set{" "}
          <code className="text-accent">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code className="text-accent">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
          <code className="text-accent">SUPABASE_SERVICE_ROLE_KEY</code> before
          moderating the guestbook or reading RSVPs.
        </p>
      </Shell>
    );
  }

  if (!checked) {
    return (
      <Shell>
        <p className="text-sm text-muted">Checking your session…</p>
      </Shell>
    );
  }

  return session ? <ModerationPanel session={session} /> : <LoginForm />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-md">
        <p className="text-[12px] uppercase tracking-widest2 text-accent">
          Couple only
        </p>
        <h1 className="mt-5 font-display text-3xl italic text-ink">
          Guestbook &amp; RSVPs
        </h1>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setSubmitting(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: toIdentity(username),
      password,
    });

    setSubmitting(false);
    // Supabase phrases this in terms of an email address, which would only
    // confuse someone who typed a username.
    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "That username and password do not match."
          : signInError.message
      );
    }
  };

  return (
    <Shell>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest2 text-muted">
            Username
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="username"
            className="mt-2 w-full border-b border-line-dark bg-transparent pb-2 text-[15px] text-ink outline-none transition-colors duration-300 focus:border-accent-bright"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest2 text-muted">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="mt-2 w-full border-b border-line-dark bg-transparent pb-2 text-[15px] text-ink outline-none transition-colors duration-300 focus:border-accent-bright"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 border border-accent bg-accent px-5 py-3 text-[11px] uppercase tracking-widest2 text-paper transition-colors duration-300 hover:bg-transparent hover:text-ink disabled:opacity-40"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        {error && <p className="text-xs text-accent">{error}</p>}

        <a
          href="/"
          className="mt-2 text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-accent"
        >
          &larr; Back to the invitation
        </a>
      </form>
    </Shell>
  );
}

function ModerationPanel({ session }: { session: Session }) {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [rsvps, setRsvps] = useState<AdminRsvp[]>([]);
  const [rsvpError, setRsvpError] = useState<string | null>(null);
  const [rsvpLoaded, setRsvpLoaded] = useState(false);
  const [tab, setTab] = useState<TabId>("messages");
  const [rsvpView, setRsvpView] = useState<RsvpView>("replies");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const token = session.access_token;

  const fetchMessages = useCallback(async () => {
    setLoadError(null);
    try {
      const res = await fetch(apiPath("/api/admin/messages"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) setLoadError(body.error ?? "Failed to load messages");
      else setMessages(body.messages as AdminMessage[]);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchRsvps = useCallback(async () => {
    setRsvpError(null);
    try {
      const res = await fetch(apiPath("/api/admin/rsvps"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) setRsvpError(body.error ?? "Failed to load RSVPs");
      else setRsvps(body.rsvps as AdminRsvp[]);
    } catch (err) {
      setRsvpError(err instanceof Error ? err.message : "Failed to load RSVPs");
    } finally {
      setRsvpLoaded(true);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
    fetchRsvps();
  }, [fetchMessages, fetchRsvps]);

  const setApproved = async (id: string, approved: boolean) => {
    setBusyId(id);
    setActionError(null);
    try {
      const res = await fetch(apiPath("/api/admin/messages"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, approved }),
      });
      const body = await res.json();
      if (!res.ok) setActionError(body.error ?? "Failed to update message");
      else
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, approved: body.message.approved } : m
          )
        );
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update message");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    setBusyId(id);
    setActionError(null);
    try {
      const res = await fetch(
        `/api/admin/messages?id=${encodeURIComponent(id)}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const body = await res.json();
      if (!res.ok) setActionError(body.error ?? "Failed to delete message");
      else setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete message");
    } finally {
      setBusyId(null);
    }
  };

  const removeRsvp = async (id: string) => {
    setBusyId(id);
    setActionError(null);
    try {
      const res = await fetch(apiPath(`/api/admin/rsvps?id=${encodeURIComponent(id)}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) setActionError(body.error ?? "Failed to delete RSVP");
      else setRsvps((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete RSVP");
    } finally {
      setBusyId(null);
    }
  };

  const pending = messages.filter((m) => !m.approved);
  const approved = messages.filter((m) => m.approved);

  return (
    <main className="min-h-[100svh] bg-paper px-6 py-14 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-6 border-b border-line-dark pb-6">
          <div>
            <p className="text-[12px] uppercase tracking-widest2 text-accent">
              Couple only
            </p>
            <h1 className="mt-5 font-display text-3xl italic text-ink">
              Guestbook &amp; RSVPs
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              type="button"
              onClick={() => supabase?.auth.signOut()}
              className="text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-accent"
            >
              Sign out
            </button>
            <a
              href="/"
              className="text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-accent"
            >
              View invitation
            </a>
          </div>
        </div>

        {actionError && <p className="mt-5 text-sm text-accent">{actionError}</p>}

        <TabBar
          className="mt-10"
          active={tab}
          onSelect={setTab}
          tabs={[
            { id: "messages", label: `Messages (${messages.length})` },
            { id: "rsvps", label: `RSVP (${rsvps.length})` },
          ]}
        />

        {tab === "messages" ? (
          loadError ? (
            <p className="mt-10 text-sm text-accent">
              Couldn&apos;t load messages: {loadError}
            </p>
          ) : loading ? (
            <p className="mt-10 text-sm text-muted">Loading…</p>
          ) : (
            <div className="mt-12 space-y-14">
              <Group
                title={`Awaiting approval (${pending.length})`}
                empty="Nothing waiting on approval."
                messages={pending}
                busyId={busyId}
                onApprove={(id) => setApproved(id, true)}
                onDelete={remove}
              />
              <Group
                title={`Published (${approved.length})`}
                empty="No notes published yet."
                messages={approved}
                busyId={busyId}
                onUnapprove={(id) => setApproved(id, false)}
                onDelete={remove}
              />
            </div>
          )
        ) : (
          <RsvpPanel
            rsvps={rsvps}
            error={rsvpError}
            loaded={rsvpLoaded}
            busyId={busyId}
            onDelete={removeRsvp}
            view={rsvpView}
            onView={setRsvpView}
          />
        )}
      </div>
    </main>
  );
}

function Group({
  title,
  empty,
  messages,
  busyId,
  onApprove,
  onUnapprove,
  onDelete,
}: {
  title: string;
  empty: string;
  messages: AdminMessage[];
  busyId: string | null;
  onApprove?: (id: string) => void;
  onUnapprove?: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <section>
      <h2 className="text-[11px] uppercase tracking-widest2 text-accent">
        {title}
      </h2>
      {messages.length === 0 ? (
        <p className="mt-4 text-sm text-muted">{empty}</p>
      ) : (
        <div className="mt-5 space-y-4">
          {messages.map((m) => (
            <article
              key={m.id}
              className="border border-line-dark-soft bg-paper-dim p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[11px] uppercase tracking-widest2 text-ink">
                  {m.name}
                </p>
                <p className="shrink-0 text-[10px] uppercase tracking-widest2 text-muted">
                  {new Date(m.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                {m.message}
              </p>
              <div className="mt-5 flex items-center gap-6 border-t border-line-dark-soft pt-4">
                {onApprove && (
                  <button
                    type="button"
                    onClick={() => onApprove(m.id)}
                    disabled={busyId === m.id}
                    className="text-[11px] uppercase tracking-widest2 text-accent transition-colors duration-300 hover:text-ink disabled:opacity-40"
                  >
                    Approve
                  </button>
                )}
                {onUnapprove && (
                  <button
                    type="button"
                    onClick={() => onUnapprove(m.id)}
                    disabled={busyId === m.id}
                    className="text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-ink disabled:opacity-40"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(m.id)}
                  disabled={busyId === m.id}
                  className="text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-accent disabled:opacity-40"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function TabBar<T extends string>({
  tabs,
  active,
  onSelect,
  className = "",
}: {
  tabs: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-8 border-b border-line-dark ${className}`}>
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          aria-current={active === t.id}
          className={`-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-widest2 transition-colors duration-300 ${
            active === t.id
              ? "border-accent text-accent"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function RsvpPanel({
  rsvps,
  error,
  loaded,
  busyId,
  onDelete,
  view,
  onView,
}: {
  rsvps: AdminRsvp[];
  error: string | null;
  loaded: boolean;
  busyId: string | null;
  onDelete: (id: string) => void;
  view: RsvpView;
  onView: (view: RsvpView) => void;
}) {
  const coming = rsvps.filter((r) => r.attending);
  // Declines are stored with party_size 1 so they never inflate the headcount;
  // the total counts only the replies that accepted.
  const seats = coming.reduce((total, r) => total + r.party_size, 0);
  const declined = rsvps.length - coming.length;

  if (error) {
    return (
      <p className="mt-10 text-sm text-accent">Couldn&apos;t load RSVPs: {error}</p>
    );
  }

  if (!loaded) {
    return <p className="mt-10 text-sm text-muted">Loading…</p>;
  }

  if (rsvps.length === 0) {
    return <p className="mt-10 text-sm text-muted">No replies yet.</p>;
  }

  return (
    <div className="mt-10">
      <p className="text-[15px] text-ink/80">
        <span className="tabular-nums text-ink">{seats}</span>{" "}
        {seats === 1 ? "person" : "people"} attending across{" "}
        <span className="tabular-nums text-ink">{coming.length}</span>{" "}
        {coming.length === 1 ? "reply" : "replies"} &middot;{" "}
        <span className="tabular-nums text-ink">{declined}</span> declined
      </p>

      <TabBar
        className="mt-8"
        active={view}
        onSelect={onView}
        tabs={[
          { id: "replies", label: "Replies" },
          { id: "headcount", label: "Headcount" },
        ]}
      />

      {view === "replies" ? (
        <div className="mt-8 space-y-4">
          {rsvps.map((r) => (
            <article
              key={r.id}
              className="border border-line-dark bg-paper-dim p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[11px] uppercase tracking-widest2 text-ink">
                  {r.name}
                </p>
                <p className="shrink-0 text-[10px] uppercase tracking-widest2 text-muted">
                  {new Date(r.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                {r.attending
                  ? `Attending — ${r.party_size} ${r.party_size === 1 ? "person" : "people"}`
                  : "Not attending"}
              </p>

              {r.note && (
                <p className="mt-2 text-[15px] italic leading-relaxed text-muted">
                  {r.note}
                </p>
              )}

              <div className="mt-5 flex items-center gap-6 border-t border-line-dark pt-4">
                <button
                  type="button"
                  onClick={() => onDelete(r.id)}
                  disabled={busyId === r.id}
                  className="text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-accent disabled:opacity-40"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line-dark">
                <th className="pb-3 text-[10px] uppercase tracking-widest2 text-muted">
                  Who sent
                </th>
                <th className="pb-3 text-right text-[10px] uppercase tracking-widest2 text-muted">
                  People
                </th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id} className="border-b border-line-dark">
                  <td className="py-3 pr-4 text-[15px] text-ink">{r.name}</td>
                  <td className="py-3 text-right text-[15px] tabular-nums text-ink">
                    {r.attending ? (
                      r.party_size
                    ) : (
                      <span className="text-[11px] uppercase tracking-widest2 text-muted">
                        Not attending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="pt-5 text-[11px] uppercase tracking-widest2 text-accent">
                  Total attending
                </td>
                <td className="pt-5 text-right font-display text-3xl tabular-nums text-ink">
                  {seats}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
