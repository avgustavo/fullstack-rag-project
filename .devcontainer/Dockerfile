FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    nano \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*