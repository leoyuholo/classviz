# ClassViz

Visual analytics tool for K12 online learning activities.

## Development

**Prerequisite**: Need to have [docker](https://store.docker.com/editions/community/docker-ce-server-ubuntu/plans/docker-ce-server-ubuntu-tier?tab=instructions) and [docker-compose](https://docs.docker.com/compose/install/) ](https://docs.docker.com/compose/) installed on system.

Run `docker-compose up -d` to spin up all the containers.

Run `docker-compose exec front /bin/bash` to get a shell of front end container. Run `yarn` to install all the dependencies, then run `yarn run dev` to start a live reload server. Edit any files in `front` directory to trigger live reload.

Run `docker-compose exec web /bin/bash` to backend container. Also run `yarn` to install dependencies and `yarn run start` to start API server.

Visit `localhost:8080` to access the system, `localhost:8080/dashboard` to access [Parse Dashboard](https://github.com/parse-community/parse-dashboard).

You may edit `docker-compose.yaml` to run different commands.
 
Run:

    # cd ~/classviz/front
    # ~/docker-compose exec front /bin/bash
    # yarn run dev
    Open a new terminal or use command tmux a
    Run:
    # cd ~/classviz/web
    # ~/docker-compose exec web /bin/bash
    # yarn run dev
    Local computer:
    # ssh -L 8080:127.0.0.1:8080 user@143.*.*.*

HKUST VisLab http://vis.cse.ust.hk/







