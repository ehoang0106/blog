---
title: Enhanced My Home Network Security with Wazuh - A Powerful Open-source CyberSecurity Tool
date: 03-12-2025 13:14:25
tags:
- security
- wazuh
- xdr
- cybersecurity
---

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wz-cover.png)

Cybersecurity isn't just for enterprises - it's essential for home labs and personal IT setup too. I found Wazuh - a powerful open-source SEIM and XDR platform that provides threat detection, log analysis, and system monitoring.

So I decided to setup Wazuh at home, using my Raspberry Pi to host the server, and deploying agents to my devices.

---
## Why Wazuh?

Unlike many commercial security tools, Wazuh is completely **FREE** and open-source, making it accessible for IT professionals, security enthusiasts, and home users alike. Therefore, I can monitor system activity, detect anomalies, and improve overall cybersecurity awareness.

- **Real-time Monitoring**: Wazuh alerts me to suspicious activities on our systems and network.
- **Log Analysis & Threat Detection**: I can analyze logs, detect intrusions, and respond to security events in real time.
- **System Integrity**: Wazuh's **File Integrity Monitoring (FIM)** detects unauthorized changes to critical files.

If you're pursuiing a career in IT, DevOps, or cybersecurity, setting up Wazuh is valuable way to gain practical experience with a real-word security monitoring tool.

--- 

## System Rerequirements & Installation Considerations

Wazuh offers flexible deployment options, including an all-in-one installation via their ready-to-use script and Docker Compose. Their documentation provides a very detailed instructions for multiple installation methods, including Ansible automation. You can check it out [right here](https://documentation.wazuh.com/current/installation-guide/index.html).

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/aio-wz.webp)

However, when I attempted to use Docker Compose on the Raspberry Pi, I realized that their Docker Compose setup does not yet support `ARM` architecture, basically applicable for `AMD` architecture instead.

Therefore, a manual installation is required to get Wazuh running properly.

Additionally, Wazuh specifies that a minimum of `8GB RAM` is required for 1-25 agents and `50GB` of storage for 90 days of monitoring. You can review the requirements documentation [here](https://documentation.wazuh.com/current/quickstart.html). 

I'm using a Raspberry Pi 5 with 16GB of RAM, so hardware is not an issue.

After installed the agents, you can configure the custom rules for each of them by editing the `ossec.conf` file. Below is an example rule that I've configured when there is a change on my Desktop.

If the agent are on the Linux system, the config file should be in the: 
``` 
/Library/Ossec/etc/ossec.conf
```
and if it is on Windows:
```
C:\Program Files (x86)\ossec-agent 
```
Check if there is a change on my Desktop on Windows PC:
```js
<directories realtime="yes" report_changes="yes" check_all="yes">C:\Users\KhoaHoang\Desktop</directories>
```
As you can see, Wazuh can detect the new added file.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wh-+(1).png)

Even the content of the file.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wh-+(2).png)

 Or the content has been changed. It's so powerful.

![image](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wh-+(3).png)

Wazuh’s dashboard gives a clear view of security information:

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wz-3.png)

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wz-4.png)

If your system stores sensitive data like user credentials or credit card info, staying compliant with security standards is crucial. Wazuh will scan your infrastructure and checking if it meets key compliance requirements using frameworks like:

- PCI DSS – Ensures credit card data is handled securely.

- GDPR – Keeps personal data safe and compliant with EU regulations.

- HIPAA – Protects healthcare information.

- NIST, CIS, and more – Covers a wide range of security policies.

It continuously scans for vulnerabilities and misconfigurations, helping you point out the issues before they become problems.

![img](https://s3.us-east-1.amazonaws.com/blog.khoah.net/media/wazuh/wz-5.png)




---

## Challenges Encountered

- I initially tried deploying Wazuh via Docker on my Raspberry Pi, only to spend hours troubleshooting why it wasn’t working before discovering the latest Wazuh version doesn’t support Docker on ARM. Lesson learned: always check compatibility first!

- Wazuh is powerful but not plug-and-play. Understanding its full potential requires reading the docs and experimenting with features like log collection, intrusion detection, and compliance monitoring. Setting it up is just the start—fine-tuning it takes time.

- While the Wazuh Manager and Agents run fine, the Elasticsearch-based dashboard can be sluggish on lower-end hardware.

Despite the challenges, setting up Wazuh was worth it—the hands-on learning and security insights make it a great addition to any home lab.


## Improvements:

- I might consider moving the server to the cloud for better performance and scalability. However, since this setup is for my home, it's just an idea for now.
- Set up a bot, like a Discord or Telegram bot, to push notifications to me whenever an event occurs.