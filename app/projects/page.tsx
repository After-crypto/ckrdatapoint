"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import Footer from "@/components/Footer"; // Uncomment if your footer is ready

// --- Types ---
interface Project {
  title: string;
  author: string;
  description: string;
  technologies: string[];
  difficulty: string;
  duration: string;
  stars: number;
  contributors: number;
  category: string;
  githubUrl: string;
  demoUrl: string;
}

const projects = [ /* ... Your full list of 100+ projects remains here ... */ 
  // Web Development
  { title: "React", author: "Facebook", description: "A JavaScript library for building user interfaces", technologies: ["JavaScript", "JSX", "Virtual DOM"], difficulty: "Advanced", duration: "Ongoing", stars: 227000, contributors: 1500, category: "Web Development", githubUrl: "https://github.com/facebook/react", demoUrl: "https://react.dev/" },
  { title: "Vue.js", author: "Evan You", description: "Progressive JavaScript framework for building user interfaces", technologies: ["JavaScript", "TypeScript", "HTML"], difficulty: "Intermediate", duration: "Ongoing", stars: 207000, contributors: 440, category: "Web Development", githubUrl: "https://github.com/vuejs/vue", demoUrl: "https://vuejs.org/" },
  { title: "Angular", author: "Google", description: "Platform for building mobile and desktop web applications", technologies: ["TypeScript", "RxJS", "HTML"], difficulty: "Advanced", duration: "Ongoing", stars: 95000, contributors: 1700, category: "Web Development", githubUrl: "https://github.com/angular/angular", demoUrl: "https://angular.io/" },
  { title: "Express.js", author: "TJ Holowaychuk", description: "Fast, unopinionated, minimalist web framework for Node.js", technologies: ["Node.js", "JavaScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 65000, contributors: 285, category: "Web Development", githubUrl: "https://github.com/expressjs/express", demoUrl: "https://expressjs.com/" },
  { title: "Next.js", author: "Vercel", description: "The React framework for production", technologies: ["React", "TypeScript", "Node.js"], difficulty: "Advanced", duration: "Ongoing", stars: 125000, contributors: 2400, category: "Web Development", githubUrl: "https://github.com/vercel/next.js", demoUrl: "https://nextjs.org/" },
  { title: "Nuxt.js", author: "Nuxt Team", description: "The Intuitive Vue Framework", technologies: ["Vue.js", "Node.js", "TypeScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 54000, contributors: 420, category: "Web Development", githubUrl: "https://github.com/nuxt/nuxt", demoUrl: "https://nuxt.com/" },
  { title: "Svelte", author: "Rich Harris", description: "Cybernetically enhanced web apps", technologies: ["JavaScript", "TypeScript", "CSS"], difficulty: "Intermediate", duration: "Ongoing", stars: 78000, contributors: 350, category: "Web Development", githubUrl: "https://github.com/sveltejs/svelte", demoUrl: "https://svelte.dev/" },
  { title: "Gatsby", author: "Gatsby Team", description: "Build blazing fast, modern apps and websites with React", technologies: ["React", "GraphQL", "Webpack"], difficulty: "Advanced", duration: "Ongoing", stars: 55000, contributors: 980, category: "Web Development", githubUrl: "https://github.com/gatsbyjs/gatsby", demoUrl: "https://www.gatsbyjs.com/" },
  { title: "Tailwind CSS", author: "Adam Wathan", description: "A utility-first CSS framework for rapidly building custom designs", technologies: ["CSS", "PostCSS", "JavaScript"], difficulty: "Beginner", duration: "Ongoing", stars: 82000, contributors: 260, category: "Web Development", githubUrl: "https://github.com/tailwindlabs/tailwindcss", demoUrl: "https://tailwindcss.com/" },
  { title: "Bootstrap", author: "Twitter", description: "The most popular HTML, CSS, and JavaScript framework", technologies: ["HTML", "CSS", "JavaScript"], difficulty: "Beginner", duration: "Ongoing", stars: 170000, contributors: 1200, category: "Web Development", githubUrl: "https://github.com/twbs/bootstrap", demoUrl: "https://getbootstrap.com/" },

  // Mobile Development
  { title: "React Native", author: "Facebook", description: "A framework for building native apps using React", technologies: ["React", "JavaScript", "Java", "Objective-C"], difficulty: "Advanced", duration: "Ongoing", stars: 118000, contributors: 2300, category: "Mobile Development", githubUrl: "https://github.com/facebook/react-native", demoUrl: "https://reactnative.dev/" },
  { title: "Flutter", author: "Google", description: "UI toolkit for building natively compiled applications", technologies: ["Dart", "C++", "Skia"], difficulty: "Advanced", duration: "Ongoing", stars: 165000, contributors: 1850, category: "Mobile Development", githubUrl: "https://github.com/flutter/flutter", demoUrl: "https://flutter.dev/" },
  { title: "Ionic", author: "Ionic Team", description: "Cross-platform app development with web technologies", technologies: ["TypeScript", "Angular", "React"], difficulty: "Intermediate", duration: "Ongoing", stars: 52000, contributors: 320, category: "Mobile Development", githubUrl: "https://github.com/ionic-team/ionic-framework", demoUrl: "https://ionicframework.com/" },
  { title: "Xamarin", author: "Microsoft", description: "Cross-platform app development with .NET", technologies: ["C#", ".NET", "Xamarin"], difficulty: "Advanced", duration: "Ongoing", stars: 5900, contributors: 180, category: "Mobile Development", githubUrl: "https://github.com/xamarin/Xamarin.Forms", demoUrl: "https://dotnet.microsoft.com/apps/xamarin" },
  { title: "Expo", author: "Expo Team", description: "Platform for universal React applications", technologies: ["React Native", "JavaScript", "TypeScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 34000, contributors: 180, category: "Mobile Development", githubUrl: "https://github.com/expo/expo", demoUrl: "https://expo.dev/" },
  { title: "PhoneGap", author: "Adobe", description: "Mobile app development framework using web technologies", technologies: ["HTML", "CSS", "JavaScript"], difficulty: "Intermediate", duration: "Legacy", stars: 4000, contributors: 120, category: "Mobile Development", githubUrl: "https://github.com/phonegap/phonegap", demoUrl: "https://phonegap.com/" },
  { title: "NativeScript", author: "NativeScript Team", description: "Cross-platform native mobile apps with JavaScript", technologies: ["JavaScript", "TypeScript", "Angular"], difficulty: "Advanced", duration: "Ongoing", stars: 23000, contributors: 280, category: "Mobile Development", githubUrl: "https://github.com/NativeScript/NativeScript", demoUrl: "https://nativescript.org/" },
  { title: "Cordova", author: "Apache", description: "Mobile apps with HTML, CSS & JS", technologies: ["HTML", "CSS", "JavaScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 9600, contributors: 250, category: "Mobile Development", githubUrl: "https://github.com/apache/cordova", demoUrl: "https://cordova.apache.org/" },
  { title: "Capacitor", author: "Ionic Team", description: "Cross-platform native runtime for web apps", technologies: ["TypeScript", "Swift", "Java"], difficulty: "Intermediate", duration: "Ongoing", stars: 12000, contributors: 150, category: "Mobile Development", githubUrl: "https://github.com/ionic-team/capacitor", demoUrl: "https://capacitorjs.com/" },
  { title: "Quasar", author: "Quasar Team", description: "Vue.js based framework for cross-platform apps", technologies: ["Vue.js", "JavaScript", "Cordova"], difficulty: "Intermediate", duration: "Ongoing", stars: 26000, contributors: 240, category: "Mobile Development", githubUrl: "https://github.com/quasarframework/quasar", demoUrl: "https://quasar.dev/" },

  // Machine Learning & AI
  { title: "TensorFlow", author: "Google", description: "Open source machine learning framework", technologies: ["Python", "C++", "CUDA"], difficulty: "Advanced", duration: "Ongoing", stars: 185000, contributors: 4800, category: "Machine Learning", githubUrl: "https://github.com/tensorflow/tensorflow", demoUrl: "https://tensorflow.org/" },
  { title: "PyTorch", author: "Facebook", description: "Tensors and dynamic neural networks in Python", technologies: ["Python", "C++", "CUDA"], difficulty: "Advanced", duration: "Ongoing", stars: 83000, contributors: 4600, category: "Machine Learning", githubUrl: "https://github.com/pytorch/pytorch", demoUrl: "https://pytorch.org/" },
  { title: "Scikit-learn", author: "Scikit-learn Team", description: "Machine learning library for Python", technologies: ["Python", "NumPy", "SciPy"], difficulty: "Intermediate", duration: "Ongoing", stars: 59000, contributors: 2900, category: "Machine Learning", githubUrl: "https://github.com/scikit-learn/scikit-learn", demoUrl: "https://scikit-learn.org/" },
  { title: "Keras", author: "François Chollet", description: "Deep learning API written in Python", technologies: ["Python", "TensorFlow", "Theano"], difficulty: "Intermediate", duration: "Ongoing", stars: 61000, contributors: 1200, category: "Machine Learning", githubUrl: "https://github.com/keras-team/keras", demoUrl: "https://keras.io/" },
  { title: "OpenCV", author: "OpenCV Team", description: "Computer vision and machine learning software library", technologies: ["C++", "Python", "Java"], difficulty: "Advanced", duration: "Ongoing", stars: 78000, contributors: 1850, category: "Machine Learning", githubUrl: "https://github.com/opencv/opencv", demoUrl: "https://opencv.org/" },
  { title: "Pandas", author: "Wes McKinney", description: "Data manipulation and analysis library", technologies: ["Python", "Cython", "NumPy"], difficulty: "Intermediate", duration: "Ongoing", stars: 43000, contributors: 3100, category: "Machine Learning", githubUrl: "https://github.com/pandas-dev/pandas", demoUrl: "https://pandas.pydata.org/" },
  { title: "NumPy", author: "NumPy Team", description: "Fundamental package for scientific computing with Python", technologies: ["Python", "C", "Fortran"], difficulty: "Intermediate", duration: "Ongoing", stars: 27000, contributors: 1500, category: "Machine Learning", githubUrl: "https://github.com/numpy/numpy", demoUrl: "https://numpy.org/" },
  { title: "Matplotlib", author: "Matplotlib Team", description: "Python plotting library", technologies: ["Python", "C++"], difficulty: "Intermediate", duration: "Ongoing", stars: 20000, contributors: 1800, category: "Machine Learning", githubUrl: "https://github.com/matplotlib/matplotlib", demoUrl: "https://matplotlib.org/" },
  { title: "Jupyter", author: "Project Jupyter", description: "Interactive computing across dozens of programming languages", technologies: ["Python", "JavaScript", "TypeScript"], difficulty: "Beginner", duration: "Ongoing", stars: 11500, contributors: 680, category: "Machine Learning", githubUrl: "https://github.com/jupyter/notebook", demoUrl: "https://jupyter.org/" },
  { title: "Hugging Face Transformers", author: "Hugging Face", description: "State-of-the-art Machine Learning for JAX, PyTorch and TensorFlow", technologies: ["Python", "PyTorch", "TensorFlow"], difficulty: "Advanced", duration: "Ongoing", stars: 133000, contributors: 2800, category: "Machine Learning", githubUrl: "https://github.com/huggingface/transformers", demoUrl: "https://huggingface.co/" },

  // DevOps & Cloud
  { title: "Docker", author: "Docker Inc", description: "Platform for developing, shipping, and running applications", technologies: ["Go", "Linux", "Containers"], difficulty: "Advanced", duration: "Ongoing", stars: 68000, contributors: 4200, category: "DevOps", githubUrl: "https://github.com/docker/docker-ce", demoUrl: "https://docker.com/" },
  { title: "Kubernetes", author: "Google", description: "Container orchestration system for automating deployment", technologies: ["Go", "Docker", "YAML"], difficulty: "Advanced", duration: "Ongoing", stars: 110000, contributors: 6800, category: "DevOps", githubUrl: "https://github.com/kubernetes/kubernetes", demoUrl: "https://kubernetes.io/" },
  { title: "Terraform", author: "HashiCorp", description: "Infrastructure as code software tool", technologies: ["Go", "HCL"], difficulty: "Advanced", duration: "Ongoing", stars: 42000, contributors: 1900, category: "DevOps", githubUrl: "https://github.com/hashicorp/terraform", demoUrl: "https://terraform.io/" },
  { title: "Jenkins", author: "Jenkins Community", description: "Automation server for building, testing, and deploying", technologies: ["Java", "Groovy"], difficulty: "Advanced", duration: "Ongoing", stars: 23000, contributors: 2300, category: "DevOps", githubUrl: "https://github.com/jenkinsci/jenkins", demoUrl: "https://jenkins.io/" },
  { title: "Ansible", author: "Red Hat", description: "IT automation platform that makes apps and systems easier to deploy", technologies: ["Python", "YAML"], difficulty: "Intermediate", duration: "Ongoing", stars: 62000, contributors: 5400, category: "DevOps", githubUrl: "https://github.com/ansible/ansible", demoUrl: "https://ansible.com/" },
  { title: "GitLab", author: "GitLab Inc", description: "DevOps platform for the entire software development lifecycle", technologies: ["Ruby", "Go", "Vue.js"], difficulty: "Advanced", duration: "Ongoing", stars: 24000, contributors: 3800, category: "DevOps", githubUrl: "https://github.com/gitlabhq/gitlabhq", demoUrl: "https://gitlab.com/" },
  { title: "Prometheus", author: "Prometheus Team", description: "Monitoring system and time series database", technologies: ["Go", "PromQL"], difficulty: "Advanced", duration: "Ongoing", stars: 55000, contributors: 1100, category: "DevOps", githubUrl: "https://github.com/prometheus/prometheus", demoUrl: "https://prometheus.io/" },
  { title: "Grafana", author: "Grafana Labs", description: "Open source analytics and monitoring solution", technologies: ["TypeScript", "Go", "React"], difficulty: "Intermediate", duration: "Ongoing", stars: 63000, contributors: 2100, category: "DevOps", githubUrl: "https://github.com/grafana/grafana", demoUrl: "https://grafana.com/" },
  { title: "Vagrant", author: "HashiCorp", description: "Tool for building and managing virtual machine environments", technologies: ["Ruby", "Shell"], difficulty: "Intermediate", duration: "Ongoing", stars: 26000, contributors: 890, category: "DevOps", githubUrl: "https://github.com/hashicorp/vagrant", demoUrl: "https://vagrantup.com/" },
  { title: "Helm", author: "Helm Community", description: "Package manager for Kubernetes", technologies: ["Go", "YAML"], difficulty: "Advanced", duration: "Ongoing", stars: 27000, contributors: 860, category: "DevOps", githubUrl: "https://github.com/helm/helm", demoUrl: "https://helm.sh/" },

  // Data Science
  { title: "Apache Spark", author: "Apache", description: "Unified analytics engine for large-scale data processing", technologies: ["Scala", "Python", "Java"], difficulty: "Advanced", duration: "Ongoing", stars: 39000, contributors: 3000, category: "Data Science", githubUrl: "https://github.com/apache/spark", demoUrl: "https://spark.apache.org/" },
  { title: "Apache Kafka", author: "Apache", description: "Distributed streaming platform", technologies: ["Java", "Scala"], difficulty: "Advanced", duration: "Ongoing", stars: 28000, contributors: 1800, category: "Data Science", githubUrl: "https://github.com/apache/kafka", demoUrl: "https://kafka.apache.org/" },
  { title: "Elasticsearch", author: "Elastic", description: "Distributed, RESTful search and analytics engine", technologies: ["Java", "Lucene"], difficulty: "Advanced", duration: "Ongoing", stars: 69000, contributors: 1900, category: "Data Science", githubUrl: "https://github.com/elastic/elasticsearch", demoUrl: "https://elastic.co/" },
  { title: "Apache Airflow", author: "Apache", description: "Platform to programmatically author, schedule and monitor workflows", technologies: ["Python", "SQL"], difficulty: "Advanced", duration: "Ongoing", stars: 36000, contributors: 3200, category: "Data Science", githubUrl: "https://github.com/apache/airflow", demoUrl: "https://airflow.apache.org/" },
  { title: "Plotly", author: "Plotly", description: "Interactive graphing library for Python", technologies: ["Python", "JavaScript", "R"], difficulty: "Intermediate", duration: "Ongoing", stars: 16000, contributors: 280, category: "Data Science", githubUrl: "https://github.com/plotly/plotly.py", demoUrl: "https://plotly.com/" },
  { title: "D3.js", author: "Mike Bostock", description: "Data-driven documents for dynamic, interactive data visualizations", technologies: ["JavaScript", "SVG", "CSS"], difficulty: "Advanced", duration: "Ongoing", stars: 108000, contributors: 180, category: "Data Science", githubUrl: "https://github.com/d3/d3", demoUrl: "https://d3js.org/" },
  { title: "R", author: "R Core Team", description: "Programming language for statistical computing and graphics", technologies: ["R", "C", "Fortran"], difficulty: "Intermediate", duration: "Ongoing", stars: 4200, contributors: 85, category: "Data Science", githubUrl: "https://github.com/wch/r-source", demoUrl: "https://r-project.org/" },
  { title: "Julia", author: "Julia Team", description: "High-performance programming language for technical computing", technologies: ["Julia", "C", "LLVM"], difficulty: "Advanced", duration: "Ongoing", stars: 45000, contributors: 1400, category: "Data Science", githubUrl: "https://github.com/JuliaLang/julia", demoUrl: "https://julialang.org/" },
  { title: "Apache Superset", author: "Apache", description: "Modern data exploration and visualization platform", technologies: ["Python", "React", "TypeScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 62000, contributors: 2800, category: "Data Science", githubUrl: "https://github.com/apache/superset", demoUrl: "https://superset.apache.org/" },
  { title: "MLflow", author: "Databricks", description: "Platform for the machine learning lifecycle", technologies: ["Python", "Java", "R"], difficulty: "Intermediate", duration: "Ongoing", stars: 18000, contributors: 710, category: "Data Science", githubUrl: "https://github.com/mlflow/mlflow", demoUrl: "https://mlflow.org/" },

  // Game Development
  { title: "Unity", author: "Unity Technologies", description: "Cross-platform game engine", technologies: ["C#", "UnityScript", "Boo"], difficulty: "Advanced", duration: "Ongoing", stars: 11000, contributors: 500, category: "Game Development", githubUrl: "https://github.com/Unity-Technologies", demoUrl: "https://unity.com/" },
  { title: "Unreal Engine", author: "Epic Games", description: "3D computer graphics game engine", technologies: ["C++", "Blueprints"], difficulty: "Advanced", duration: "Ongoing", stars: 19000, contributors: 850, category: "Game Development", githubUrl: "https://github.com/EpicGames/UnrealEngine", demoUrl: "https://unrealengine.com/" },
  { title: "Godot", author: "Godot Team", description: "Multi-platform 2D and 3D game engine", technologies: ["GDScript", "C#", "C++"], difficulty: "Intermediate", duration: "Ongoing", stars: 90000, contributors: 2400, category: "Game Development", githubUrl: "https://github.com/godotengine/godot", demoUrl: "https://godotengine.org/" },
  { title: "Phaser", author: "Photon Storm", description: "2D game framework for making HTML5 games", technologies: ["JavaScript", "TypeScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 37000, contributors: 380, category: "Game Development", githubUrl: "https://github.com/photonstorm/phaser", demoUrl: "https://phaser.io/" },
  { title: "LibGDX", author: "LibGDX Team", description: "Cross-platform Java game development framework", technologies: ["Java", "C++"], difficulty: "Advanced", duration: "Ongoing", stars: 23000, contributors: 680, category: "Game Development", githubUrl: "https://github.com/libgdx/libgdx", demoUrl: "https://libgdx.com/" },
  { title: "Cocos2d", author: "Cocos2d Team", description: "Framework for building 2D games and interactive applications", technologies: ["C++", "JavaScript", "Lua"], difficulty: "Advanced", duration: "Ongoing", stars: 18000, contributors: 1200, category: "Game Development", githubUrl: "https://github.com/cocos2d/cocos2d-x", demoUrl: "https://cocos2d-x.org/" },
  { title: "Love2D", author: "Love2D Team", description: "2D game engine for Lua", technologies: ["Lua", "C++"], difficulty: "Intermediate", duration: "Ongoing", stars: 4800, contributors: 180, category: "Game Development", githubUrl: "https://github.com/love2d/love", demoUrl: "https://love2d.org/" },
  { title: "MonoGame", author: "MonoGame Team", description: "Cross platform .NET game framework", technologies: ["C#", ".NET"], difficulty: "Advanced", duration: "Ongoing", stars: 11000, contributors: 480, category: "Game Development", githubUrl: "https://github.com/MonoGame/MonoGame", demoUrl: "https://monogame.net/" },
  { title: "Pygame", author: "Pygame Team", description: "Cross-platform set of Python modules for writing video games", technologies: ["Python", "C"], difficulty: "Beginner", duration: "Ongoing", stars: 7200, contributors: 280, category: "Game Development", githubUrl: "https://github.com/pygame/pygame", demoUrl: "https://pygame.org/" },
  { title: "Three.js", author: "Mr.doob", description: "JavaScript 3D library", technologies: ["JavaScript", "WebGL"], difficulty: "Advanced", duration: "Ongoing", stars: 102000, contributors: 2100, category: "Game Development", githubUrl: "https://github.com/mrdoob/three.js", demoUrl: "https://threejs.org/" },

  // Blockchain & Crypto
  { title: "Bitcoin", author: "Satoshi Nakamoto", description: "Peer-to-peer electronic cash system", technologies: ["C++", "Cryptography"], difficulty: "Advanced", duration: "Ongoing", stars: 78000, contributors: 1100, category: "Blockchain", githubUrl: "https://github.com/bitcoin/bitcoin", demoUrl: "https://bitcoin.org/" },
  { title: "Ethereum", author: "Vitalik Buterin", description: "Decentralized platform for smart contracts", technologies: ["Go", "Solidity"], difficulty: "Advanced", duration: "Ongoing", stars: 47000, contributors: 800, category: "Blockchain", githubUrl: "https://github.com/ethereum/go-ethereum", demoUrl: "https://ethereum.org/" },
  { title: "Solidity", author: "Ethereum", description: "Programming language for writing smart contracts", technologies: ["Solidity", "C++"], difficulty: "Advanced", duration: "Ongoing", stars: 23000, contributors: 750, category: "Blockchain", githubUrl: "https://github.com/ethereum/solidity", demoUrl: "https://soliditylang.org/" },
  { title: "Web3.js", author: "Ethereum Foundation", description: "Ethereum JavaScript API", technologies: ["JavaScript", "TypeScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 19000, contributors: 350, category: "Blockchain", githubUrl: "https://github.com/web3/web3.js", demoUrl: "https://web3js.org/" },
  { title: "Hardhat", author: "Nomic Foundation", description: "Ethereum development environment", technologies: ["TypeScript", "Solidity"], difficulty: "Intermediate", duration: "Ongoing", stars: 7100, contributors: 180, category: "Blockchain", githubUrl: "https://github.com/NomicFoundation/hardhat", demoUrl: "https://hardhat.org/" },
  { title: "OpenZeppelin", author: "OpenZeppelin", description: "Library for secure smart contract development", technologies: ["Solidity", "JavaScript"], difficulty: "Intermediate", duration: "Ongoing", stars: 25000, contributors: 450, category: "Blockchain", githubUrl: "https://github.com/OpenZeppelin/openzeppelin-contracts", demoUrl: "https://openzeppelin.com/" },
  { title: "Truffle", author: "Truffle Suite", description: "Development framework for Ethereum", technologies: ["JavaScript", "Solidity"], difficulty: "Intermediate", duration: "Ongoing", stars: 14000, contributors: 280, category: "Blockchain", githubUrl: "https://github.com/trufflesuite/truffle", demoUrl: "https://trufflesuite.com/" },
  { title: "Ganache", author: "Truffle Suite", description: "Personal blockchain for Ethereum development", technologies: ["JavaScript", "Ethereum"], difficulty: "Beginner", duration: "Ongoing", stars: 4700, contributors: 95, category: "Blockchain", githubUrl: "https://github.com/trufflesuite/ganache", demoUrl: "https://trufflesuite.com/ganache/" },
  { title: "MetaMask", author: "ConsenSys", description: "Ethereum wallet browser extension", technologies: ["JavaScript", "React"], difficulty: "Advanced", duration: "Ongoing", stars: 12000, contributors: 280, category: "Blockchain", githubUrl: "https://github.com/MetaMask/metamask-extension", demoUrl: "https://metamask.io/" },
  { title: "IPFS", author: "Protocol Labs", description: "Distributed system for storing and accessing files", technologies: ["Go", "JavaScript"], difficulty: "Advanced", duration: "Ongoing", stars: 23000, contributors: 390, category: "Blockchain", githubUrl: "https://github.com/ipfs/kubo", demoUrl: "https://ipfs.tech/" },

  // IoT & Hardware
  { title: "Arduino", author: "Arduino Team", description: "Open-source electronics platform", technologies: ["C++", "Arduino"], difficulty: "Beginner", duration: "Ongoing", stars: 15000, contributors: 280, category: "IoT", githubUrl: "https://github.com/arduino/Arduino", demoUrl: "https://arduino.cc/" },
  { title: "Raspberry Pi OS", author: "Raspberry Pi Foundation", description: "Operating system for Raspberry Pi", technologies: ["Linux", "Python", "C"], difficulty: "Intermediate", duration: "Ongoing", stars: 2600, contributors: 45, category: "IoT", githubUrl: "https://github.com/RPi-Distro/pi-gen", demoUrl: "https://raspberrypi.org/" },
  { title: "ESP-IDF", author: "Espressif", description: "Development framework for ESP32", technologies: ["C", "C++", "FreeRTOS"], difficulty: "Advanced", duration: "Ongoing", stars: 13000, contributors: 850, category: "IoT", githubUrl: "https://github.com/espressif/esp-idf", demoUrl: "https://docs.espressif.com/" },
  { title: "PlatformIO", author: "PlatformIO", description: "Professional collaborative platform for embedded development", technologies: ["Python", "C++"], difficulty: "Intermediate", duration: "Ongoing", stars: 7800, contributors: 180, category: "IoT", githubUrl: "https://github.com/platformio/platformio-core", demoUrl: "https://platformio.org/" },
  { title: "Node-RED", author: "Node-RED Team", description: "Flow-based development tool for visual programming", technologies: ["Node.js", "JavaScript"], difficulty: "Beginner", duration: "Ongoing", stars: 19000, contributors: 380, category: "IoT", githubUrl: "https://github.com/node-red/node-red", demoUrl: "https://nodered.org/" },
  { title: "Home Assistant", author: "Home Assistant", description: "Open source home automation platform", technologies: ["Python", "JavaScript"], difficulty: "Advanced", duration: "Ongoing", stars: 72000, contributors: 3200, category: "IoT", githubUrl: "https://github.com/home-assistant/core", demoUrl: "https://home-assistant.io/" },
  { title: "openHAB", author: "openHAB", description: "Vendor and technology agnostic open source automation software", technologies: ["Java", "JavaScript"], difficulty: "Advanced", duration: "Ongoing", stars: 4300, contributors: 680, category: "IoT", githubUrl: "https://github.com/openhab/openhab-core", demoUrl: "https://openhab.org/" },
  { title: "Tasmota", author: "Tasmota", description: "Alternative firmware for ESP8266/ESP32 based devices", technologies: ["C++", "Arduino"], difficulty: "Intermediate", duration: "Ongoing", stars: 22000, contributors: 520, category: "IoT", githubUrl: "https://github.com/arendst/Tasmota", demoUrl: "https://tasmota.github.io/" },
  { title: "ESPHome", author: "ESPHome", description: "System to control your ESP8266/ESP32 by simple configuration files", technologies: ["C++", "Python", "YAML"], difficulty: "Intermediate", duration: "Ongoing", stars: 8300, contributors: 680, category: "IoT", githubUrl: "https://github.com/esphome/esphome", demoUrl: "https://esphome.io/" },
  { title: "Blynk", author: "Blynk", description: "Platform for IoT projects", technologies: ["C++", "Java", "JavaScript"], difficulty: "Beginner", duration: "Ongoing", stars: 3700, contributors: 85, category: "IoT", githubUrl: "https://github.com/blynkkk/blynk-library", demoUrl: "https://blynk.io/" },
];


const FilterPill = ({ label, active, onClick, count }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      relative group px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border
      ${active 
        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
        : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-blue-600/50 hover:text-white'}
    `}
  >
    <div className="flex items-center gap-2">
      <span className={`w-1.5 h-1.5 bg-white rounded-full transition-opacity ${active ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
      {label}
      {count !== undefined && <span className="opacity-40">[{count}]</span>}
    </div>
  </button>
);

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return 'text-emerald-400 border-emerald-900/50 bg-emerald-900/10';
    case "Intermediate": return 'text-blue-400 border-blue-900/50 bg-blue-900/10';
    case "Advanced": return 'text-cyan-400 border-cyan-900/50 bg-cyan-900/10';
    default: return 'text-slate-500 border-slate-800 bg-slate-900/20';
  }
};

const ProjectsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allCategories = useMemo(() => ["All", ...Array.from(new Set(projects.map(p => p.category)))].sort(), []);
  
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchesDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesDiff && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
      
      {/* 1. SYSTEM HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors group"
            >
              <span className="inline-block group-hover:-translate-x-1 transition-transform">{"<"}</span> BACK_PROTOCOL
            </button>

            <div className="h-6 w-px bg-slate-800 mx-2" />

            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">CKR.DATAPOINT</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Archive_Live</span>
          </div>
        </div>
      </header>

      {/* 2. CONTROL DECK */}
      <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
         <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
            
            {/* Search */}
            <div className="relative w-full xl:w-96 group">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-500">QUERY:</span>
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH_PROJECT_ID..." 
                  className="w-full bg-[#020617] border border-slate-800 py-3 pl-16 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-600 transition-colors uppercase placeholder:text-slate-700"
               />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
               <select
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="bg-[#020617] border border-slate-800 py-2 px-4 text-[10px] font-mono uppercase text-slate-400 focus:border-blue-600 outline-none"
               >
                   {allCategories.map(c => <option key={c} value={c}>{c === "All" ? "CATEGORY: ALL" : c.toUpperCase()}</option>)}
               </select>

               <div className="h-4 w-px bg-slate-800 mx-2" />

               {["Beginner", "Intermediate", "Advanced"].map(d => (
                  <FilterPill 
                    key={d} 
                    label={d} 
                    active={selectedDifficulty === d} 
                    onClick={() => setSelectedDifficulty(selectedDifficulty === d ? "All" : d)} 
                  />
               ))}
            </div>
         </div>
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 relative">
        {/* Background Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProjects.map((project, idx) => (
                    <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 flex flex-col hover:border-blue-600/50 transition-all duration-300">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                        
                        <div className="p-5 border-b border-slate-800/50 bg-slate-900/20 flex justify-between text-[9px] font-mono text-slate-500 uppercase">
                            <span>{project.category.replace(/\s/g, '_')}</span>
                            <span className="text-blue-500/50">ID:{1000 + idx}</span>
                        </div>

                        <div className="p-5 flex-grow">
                            <div className="w-10 h-10 mb-4 border border-slate-800 bg-slate-950 flex items-center justify-center font-mono text-blue-500 text-[10px] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                OBJ
                            </div>
                            <h3 className="font-bold text-white text-sm uppercase mb-1 group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                                OP: {project.author}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono border-l border-slate-800 pl-3 line-clamp-3">
                                {project.description}
                            </p>
                        </div>

                        <div className="px-5 py-4 border-t border-slate-800/50 bg-slate-900/20 flex flex-col gap-3">
                            <div className="flex justify-between text-[9px] font-mono text-slate-500">
                                <span>STAR: {project.stars.toLocaleString()}</span>
                                <span className={getDifficultyStyle(project.difficulty) + " px-1 border"}>{project.difficulty}</span>
                            </div>
                            <div className="flex gap-2">
                                <a href={project.githubUrl} className="flex-1 py-1.5 border border-slate-800 text-[9px] font-bold text-center uppercase hover:bg-slate-800 transition-colors">Source</a>
                                <a href={project.demoUrl} className="flex-1 py-1.5 bg-blue-600 text-[9px] font-bold text-center uppercase text-white hover:bg-blue-500 transition-colors">Access &raquo;</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="w-full h-[40vh] flex flex-col items-center justify-center border border-dashed border-slate-800">
                    <span className="text-blue-900 text-4xl mb-4 font-mono animate-pulse">!</span>
                    <h3 className="text-sm font-mono text-blue-500 uppercase">Null_Result_Archive</h3>
                    <button onClick={() => {setSearchQuery(""); setSelectedCategory("All"); setSelectedDifficulty("All");}} 
                            className="mt-4 text-[9px] font-mono text-slate-500 underline uppercase">Reset_Registry</button>
                </div>
            )}
        </div>
      </main>

      {showBackToTop && (
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="fixed bottom-8 right-8 w-10 h-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50">
          ^
        </button>
      )}

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // GLOBAL_PROJECT_REGISTRY // 2025
      </footer>
    </div>
  );
};

export default ProjectsPage;