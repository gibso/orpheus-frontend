FROM danlynn/ember-cli:3.12.0

# add workdir for project
RUN mkdir /opt/project
WORKDIR /opt/project

# copy all files
COPY . .

# install dependencies
RUN npm install
