---
title: Enhanced My Home Network Security with Wazuh - A Powerful Open-source CyberSecurity Tool
date: 03-12-2025 13:14:25
tags:
- security
- wazuh
- xdr
- cybersecurity
---

Cybersecurity isn't just for enterprises - it's essential for home labs and personal IT setup too. I found Wazuh - a powerful an open-source SEIM and XDR platform that provides threat detection, log analysis, and system monitoring.

So I decided to setup Wazuh at home, using my Raspberry Pi to host the server, and deploying agents to my PC, laptop, and other servers as well.

---
## Why Wazuh?

Unlike many commercial security tools, Wazuh is completely free and open-source, making it accessible for IT professionals, security enthusiasts, and home users alike. By setting it up in my own environment, I can monitor system activity, detect anomalies, and improve overall cybersecurity awareness.

--- 

## System Rerequirements & Installation Considerations

Based on Wazuh's documentation, its support docker for the installation. However, when I run docker compose on the Raspberry Pi, I realized that their docker compose does not support ARM yet. Therefore, manual installation is required to get Wazuh runnign properly.
Also, 64-bit Architr
