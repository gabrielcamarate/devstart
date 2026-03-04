FROM node:20-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
  git curl ca-certificates bash \
  && rm -rf /var/lib/apt/lists/*


ENV COREPACK_HOME=/usr/local/share/corepack
RUN mkdir -p $COREPACK_HOME && chmod -R 777 $COREPACK_HOME
ENV PATH=$COREPACK_HOME:$PATH

RUN corepack enable
RUN corepack prepare pnpm@10.30.3 --activate

WORKDIR /work

RUN useradd -m dev && chown -R dev:dev /work
USER dev

CMD ["bash"]
