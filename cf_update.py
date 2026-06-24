#!/usr/bin/env python3
import json
import urllib.request
import ssl

CF_TOKEN = open("/root/.hermes/shared-workspace/credentials/cf_token.txt").read().strip()
CF_ZONE = "cecaa4014212f2d28b94a335bc0d401c"
VPS_IP = "168.144.37.19"

ctx = ssl.create_default_context()

def cf(method, path, data=None):
    url = f"https://api.cloudflare.com/client/v4{path}"
    headers = {
        "Authorization": f"Bearer {CF_TOKEN}",
        "Content-Type": "application/json",
    }
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode("utf-8")
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        return json.loads(resp.read().decode())

# 1) List all records
print("=== Listing DNS records ===")
res = cf("GET", f"/zones/{CF_ZONE}/dns_records?per_page=100")
for r in res["result"]:
    print(f"  {r['type']:6s} {r['name']:35s} -> {r['content']}  proxied={r.get('proxied')}  id={r['id']}")

# 2) Update root A record
print("\n=== Updating root A record ===")
root_a = next((r for r in res["result"] if r["name"] == "toolinter.net" and r["type"] == "A"), None)
if root_a:
    out = cf("PATCH", f"/zones/{CF_ZONE}/dns_records/{root_a['id']}", {
        "content": VPS_IP,
        "proxied": True,
    })
    print(f"  Updated: {out['success']}")
else:
    out = cf("POST", f"/zones/{CF_ZONE}/dns_records", {
        "type": "A", "name": "toolinter.net", "content": VPS_IP, "proxied": True,
    })
    print(f"  Created: {out['success']}")

# 3) Delete www CNAME if exists, create www A
print("\n=== Fixing www record ===")
www_rec = next((r for r in res["result"] if r["name"] == "www.toolinter.net"), None)
if www_rec:
    print(f"  Deleting existing {www_rec['type']} record...")
    cf("DELETE", f"/zones/{CF_ZONE}/dns_records/{www_rec['id']}")

out = cf("POST", f"/zones/{CF_ZONE}/dns_records", {
    "type": "A", "name": "www.toolinter.net", "content": VPS_IP, "proxied": True,
})
print(f"  Created www A: {out['success']}")

# 4) Final list
print("\n=== Final A records ===")
res2 = cf("GET", f"/zones/{CF_ZONE}/dns_records?type=A&per_page=100")
for r in res2["result"]:
    if "toolinter.net" in r["name"]:
        print(f"  {r['name']:35s} -> {r['content']}  proxied={r.get('proxied')}")
