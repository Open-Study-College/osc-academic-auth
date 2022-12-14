var d = (e, t = {}) => {
    let a = typeof t == 'number' ? { status: t } : t,
        s = new Headers(a.headers);
    return (
        s.has('Content-Type') || s.set('Content-Type', 'application/json; charset=utf-8'),
        new Response(JSON.stringify(e), { ...a, headers: s })
    );
};
var x = ['/build/', '/icons/', '/'],
    p = 'asset-cache',
    f = 'data-cache',
    m = 'document-cache';
function r(...e) {}
async function E(e) {
    r('Service worker installed');
}
async function b(e) {
    r('Service worker activated');
}
async function C(e) {
    let t = new Map();
    if (e.data.type === 'REMIX_NAVIGATION') {
        let { isMount: a, location: s, matches: h, manifest: g } = e.data,
            n = s.pathname + s.search + s.hash,
            [w, y, S] = await Promise.all([caches.open(f), caches.open(m), caches.match(n)]);
        if (
            ((!S || !a) &&
                (r('Caching document for', n),
                t.set(
                    n,
                    y.add(n).catch((c) => {
                        r(`Failed to cache document for ${n}:`, c);
                    })
                )),
            a)
        ) {
            for (let c of h)
                if (g.routes[c.id].hasLoader) {
                    let l = new URLSearchParams(s.search);
                    l.set('_data', c.id);
                    let i = l.toString();
                    i = i ? `?${i}` : '';
                    let o = s.pathname + i + s.hash;
                    t.has(o) ||
                        (r('Caching data for', o),
                        t.set(
                            o,
                            w.add(o).catch((R) => {
                                r(`Failed to cache data for ${o}:`, R);
                            })
                        ));
                }
        }
    }
    await Promise.all(t.values());
}
async function k(e) {
    let t = new URL(e.request.url);
    if (M(e.request)) {
        let a = await caches.match(e.request, { cacheName: p, ignoreVary: !0, ignoreSearch: !0 });
        if (a) return r('Serving asset from cache', t.pathname), a;
        r('Serving asset from network', t.pathname);
        let s = await fetch(e.request);
        return s.status === 200 && (await (await caches.open(p)).put(e.request, s.clone())), s;
    }
    if (A(e.request))
        try {
            r('Serving data from network', t.pathname + t.search);
            let a = await fetch(e.request.clone());
            return await (await caches.open(f)).put(e.request, a.clone()), a;
        } catch {
            r('Serving data from network failed, falling back to cache', t.pathname + t.search);
            let s = await caches.match(e.request);
            return s
                ? (s.headers.set('X-Remix-Worker', 'yes'), s)
                : d(
                      { message: 'Network Error' },
                      { status: 500, headers: { 'X-Remix-Catch': 'yes', 'X-Remix-Worker': 'yes' } }
                  );
        }
    if (U(e.request))
        try {
            r('Serving document from network', t.pathname);
            let a = await fetch(e.request);
            return await (await caches.open(m)).put(e.request, a.clone()), a;
        } catch (a) {
            r('Serving document from network failed, falling back to cache', t.pathname);
            let s = await caches.match(e.request);
            if (s) return s;
            throw a;
        }
    return fetch(e.request.clone());
}
var q = (e) => {
    let t = JSON.parse(e == null ? void 0 : e.data.text()),
        a = t.title ? t.title : 'Remix PWA',
        s = {
            body: t.body ? t.body : 'Notification Body Text',
            icon: t.icon ? t.icon : '/icons/android-icon-192x192.png',
            badge: t.badge ? t.badge : '/icons/android-icon-48x48.png',
            dir: t.dir ? t.dir : 'auto',
            image: t.image ? t.image : void 0,
            silent: t.silent ? t.silent : !1
        };
    self.registration.showNotification(a, { ...s });
};
function u(e, t) {
    return t.includes(e.method.toLowerCase());
}
function M(e) {
    return u(e, ['get']) && x.some((t) => e.url.startsWith(t));
}
function A(e) {
    let t = new URL(e.url);
    return u(e, ['get']) && t.searchParams.get('_data');
}
function U(e) {
    return u(e, ['get']) && e.mode === 'navigate';
}
self.addEventListener('install', (e) => {
    e.waitUntil(E(e).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
    e.waitUntil(b(e).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => {
    e.waitUntil(C(e));
});
self.addEventListener('push', (e) => {
    e.waitUntil(q(e));
});
self.addEventListener('fetch', (e) => {
    e.respondWith(
        (async () => {
            let t = {};
            try {
                t.response = await k(e);
            } catch (a) {
                t.error = a;
            }
            return F(e, t);
        })()
    );
});
async function F(e, { error: t, response: a }) {
    return a;
}
/**
 * @remix-run/server-runtime v1.6.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
