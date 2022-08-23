#!/bin/bash

. .pscale/cli-helper-scripts/use-pscale-docker-image.sh

. .pscale/cli-helper-scripts/authenticate-ps.sh

BRANCH_NAME="$1"

. .pscale/cli-helper-scripts/set-db-and-org-and-branch-name.sh

pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME"