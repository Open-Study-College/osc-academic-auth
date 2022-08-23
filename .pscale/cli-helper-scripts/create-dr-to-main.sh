. .pscale/cli-helper-scripts/use-pscale-docker-image.sh
. .pscale/cli-helper-scripts/wait-for-branch-readiness.sh

. .pscale/cli-helper-scripts/authenticate-ps.sh

. .pscale/cli-helper-scripts/ps-create-helper-functions-pr-branches.sh
create-schema-change "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "$DDL_STATEMENTS"
create-deploy-request "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME"

. .pscale/cli-helper-scripts/merge-or-close-deploy-request.sh "$DB_NAME" "$BRANCH_NAME" "$DEPLOY_REQUEST_NUMBER" "$ORG_NAME"