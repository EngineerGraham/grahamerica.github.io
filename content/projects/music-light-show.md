+++
title = "Music-Synced LED Light Show"
date = "2022-09-01T21:29:20+02:00"
tags = ["electronics", "IoT", "3d-printing", "react-native", "PCB"]
categories = ["Electronics","IoT", "3D Printing"]
banner = "img/projects/light-show/enclosure.jpg"
authors = ["Graham Smith"]
description = "A custom PCB and enclosure that samples audio frequencies and drives addressable LED strips to sync with music."
+++

<!--more-->

## The Concept

This project is an upgraded version of a basic music-synced light I built in high school using a couple solid state relays in a jar.

{{< figure src="/img/projects/light-show/original-jar.jpg" alt="Original light project in a jar" width="50%" >}}

## Custom PCB

Designed a PCB around a Particle.io wifi-enabled dev board. The board takes audio input via aux from a split output off a Bluetooth module, samples volume across different frequency bands using an MSGEQ7 chip, and outputs control signals to addressable LED strips. The sampling happens many times per second to keep the visuals tightly synced to the music.

{{< figure src="/img/projects/light-show/pcb.png" alt="Custom PCB with Particle.io board" width="50%" >}}

## Enclosure

Designed a simple enclosure using an extruded aluminum case with 3D printed end covers. The end caps mount the PCB and provide cutouts for power, audio input, and LED strip connectors. Used XLR audio cables for the connections - functional, but more tedious to work with than expected.

{{< figure src="/img/projects/light-show/enclosure.jpg" alt="Aluminum enclosure with 3D printed end caps" width="50%" >}}

## Remote Control App

Built a quick React Native app to control the device over the internet. The app allows changing colors, switching between display modes, and adjusting sensitivity.

{{< figure src="/img/projects/light-show/app.jpg" alt="React Native control app" width="25%" >}}

## The Result

The strips blend in with the window frames when not in use, but can be turned on for a light show!

{{< figure src="/img/projects/light-show/display1.jpg" alt="Light Show" width="50%" >}}

{{< figure src="/img/projects/light-show/display2.jpg" alt="Light Show" width="50%" >}}

---
