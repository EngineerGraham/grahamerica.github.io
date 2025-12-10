+++
title = "Greenwall Automation"
date = "2024-04-01T21:29:20+02:00"
tags = ["electronics", "IoT", "hydroponics", "PCB", "AWS"]
categories = ["Electronics","IoT"]
banner = "img/projects/greenwall/grown.jpg"
authors = ["Graham Smith"]
description = "A custom IoT controller for a rescued vertical hydroponic garden."
+++

<!--more-->

## The Greenwall

Rescued a commercial greenwall that was being thrown away. The original controller was proprietary and no longer supported, so I gutted it and built my own.

{{< figure src="/img/projects/greenwall/early-planting.jpg" alt="Greenwall with early seedlings" width="50%" >}}

## Custom Controller

Replaced the stock controller with a Particle.io Argon board mounted on a breakout board with relays. Designed a custom PCB for the electrical conductivity and pH probes that monitor nutrient levels in the reservoir.

{{< figure src="/img/projects/greenwall/controller.jpg" alt="Controller box with Particle.io board and relays" width="50%" >}}

The controller lives inside the unit base alongside the reservoir and irrigation pump.

{{< figure src="/img/projects/greenwall/base-unit.jpg" alt="Inside the base unit with reservoir and controller" width="50%" >}}

## Cloud Integration

Used Particle webhooks and AWS API Gateway to send sensor data to a MongoDB database. Built a Retool dashboard for remote monitoring and control - to switch between auto/manual modes, override outputs, and adjust schedules for irrigation, lighting, fans etc.

{{< figure src="/img/projects/greenwall/dashboard.jpg" alt="Retool dashboard showing EC, pH, and output states" width="50%" >}}

## Results

Now I grow all my own herbs year-round, including varieties I can't find at the grocery store.

{{< figure src="/img/projects/greenwall/grown.jpg" alt="Fully grown greenwall with herbs" width="50%" >}}

---
