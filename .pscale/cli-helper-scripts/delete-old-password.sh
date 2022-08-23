function delete-branch-connection-string {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local ORG_NAME=$3
    local CREDS=${4,,}-cicd-
    local secretshare=$5

    # delete password if it already existed
    # first, list password if it exists
    local raw_output=`pscale password list "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" --format json `
    # check return code, if not 0 then error
    if [ $? -ne 0 ]; then
        echo "Error: pscale password list returned non-zero exit code $?: $raw_output"
        exit 1
    fi

    local output=`echo $raw_output | jq -r "[.[] | select(.display_name | startswith(\"$CREDS\")) ]"`
    # if output is not "null", then password exists, delete it
    local count=0
    echo $output | jq -r '.[].id' | while read -r password ; do
        echo "$password"
        if [ "$password" != "null" ] && [ "$count" != 0 ]; then
            echo "Deleting existing password $password"
            pscale password delete --force "$DB_NAME" "$BRANCH_NAME" "$password" --org "$ORG_NAME" </dev/null
            # check return code, if not 0 then error
            if [ $? -ne 0 ]; then
                echo "Error: pscale password delete returned non-zero exit code $?"
                exit 1
            fi
        fi
        count=$((count+1))
    done
}


. .pscale/cli-helper-scripts/use-pscale-docker-image.sh
. .pscale/cli-helper-scripts/wait-for-branch-readiness.sh

. .pscale/cli-helper-scripts/authenticate-ps.sh

delete-branch-connection-string "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "$PASSWORD_NAME" 