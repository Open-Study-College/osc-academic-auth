#!/bin/bash

. .pscale/cli-helper-scripts/use-pscale-docker-image.sh
. .pscale/cli-helper-scripts/wait-for-branch-readiness.sh

. .pscale/cli-helper-scripts/authenticate-ps.sh

. .pscale/cli-helper-scripts/ps-create-helper-functions-pr-branches.sh
create-db-branch "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "recreate" "$FROM"

. .pscale/cli-helper-scripts/create-branch-connection-string-pr-branches.sh "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "$PASSWORD_NAME"

. .pscale/cli-helper-scripts/dump-and-restore-db-branch.sh "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "$FROM"