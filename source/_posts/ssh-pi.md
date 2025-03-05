---
title: SSH To My Raspberry Pi From Anywhere Using Cloudflared Tunnel
date: 03-07-2025 12:14:15
tags:
- cloudflared
- cloudflare
- pi
- raspberry pi
- ssh
---
![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/ssh-pi/cover.png)

As a renter, I have to rely on my host’s network, meaning I can’t configure the router or forward ports. Despite this, I run a Raspberry Pi at home to host several servers and manage some Discord bots. The problem? Every time I needed to update code or tweak something, I had to physically be at home. That wasn’t practical.

Then I found Cloudflare Tunnel—a groundbreaking solution. It lets me access my Raspberry Pi from anywhere without worrying about open ports, dynamic IPs, or exposing my network to potential threats. Now, whether I’m at a coffee shop or on my phone, I can SSH into my Pi effortlessly.

---


## How It Works

Cloudflare Tunnel runs a lightweight daemon (`cloudflared`) on your Raspberry Pi, which establishes an outbound connection to Cloudflare. This tunnel creates a secure link between your device and a Cloudflare-managed domain, allowing you to access your Pi without exposing it directly to the internet.

Here’s a simplified setup:
1. Install Cloudflare Tunnel on your Raspberry Pi.
2. Authenticate with Cloudflare and create a tunnel.
3. Configure the tunnel to forward SSH traffic.
4. Enable Cloudflare Access to add an extra security layer.
5. Connect remotely via SSH using the Cloudflare hostname.

For a step-by-step technical guide, check out my [GitHub repository](https://github.com/ehoang0106/pi-tunnel) where I’ve documented the setup in detail.

![gif](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/ssh-pi/tunnel-1.gif)

---

## Why Cloudflare Tunnel?

Cloudflare Tunnel provides a secure way to access services running on your local network. Unlike traditional port forwarding, it eliminates the need to open ports.
However, there are a pros and cons:

**Pros**:

- **No port forwarding** – Works without access to the router.
- **Secure & encrypted** – No exposed ports, reducing attack risks.
- **Works anywhere** – Connect from any device, even on mobile.
- **Simple setup** – No need for complex firewall rules or VPNs.
- **Browser Rendering** - Cloudflare supports rendering a terminal for SSH connectiosn in user's browser.

**Cons**:

- **Domain required** - Must own a custom domain.
- **Nameserver change** - Must use Cloudflare nameservers.
- **Cloudflare dependency** - Requires a Cloudflare account and relies on their servers.
- **Privacy concerns** - Cloudflare can access all traffic that passes through their network.


---

## Encountered issues

Occasionally, the connection between my Raspberry Pi and Cloudflare Tunnel would drop unexpectedly when using SSH in the terminal instead of the browser, requiring a manual reconnection.

I also noticed some latency when accessing my Raspberry Pi remotely, especially when using the SSH terminal in the browser. This was likely due to the additional routing through Cloudflare's servers.

## Improvements

- Disable password and only use SSH keypair to accesing the Raspberry Pi
- Implement a backup tunnel to ensure continuous access in case the primary tunnel fails.
