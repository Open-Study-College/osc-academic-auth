#!/bin/bash

. .pscale/cli-helper-scripts/use-pscale-docker-image.sh
. .pscale/cli-helper-scripts/authenticate-ps.sh
. .pscale/cli-helper-scripts/ps-create-helper-functions-pr-branches.sh
create-deployment "$DB_NAME" "$BRANCH_NAME" "$DEPLOY_REQUEST_NUMBER" "$ORG_NAME"