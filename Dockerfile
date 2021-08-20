FROM ghcr.io/container-projects/base-docker-images:node-12-npm-yo-latest

# install jhipster
RUN npm install -g generator-jhipster@7.0.1

RUN \
  # configure the "jhipster" user
  groupadd jhipster && \
  useradd jhipster -s /bin/bash -m -g jhipster -G sudo && \
  echo jhipster:jhipster |chpasswd

RUN mkdir /home/jhipster/app

RUN \
  # install the blueprint
  npm install -g generator-jhipster-quasar && \
  # fix jhipster user permissions
  chown -R jhipster:jhipster \
    /home/jhipster \
    /usr/local/lib/node_modules && \
  # cleanup
  rm -rf \
    /home/jhipster/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# expose the working directory
USER jhipster
ENV PATH $PATH:/usr/bin
WORKDIR "/home/jhipster/app"
VOLUME ["/home/jhipster/app"]
CMD ["jhipster", "--blueprints", "quasar", "--skip-checks"]