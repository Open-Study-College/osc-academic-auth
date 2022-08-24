#!/bin/bash

tmpfolder="tmpMigration/${FROM:-default}"
pscale database dump "$DB_NAME" "staging" --org "$ORG_NAME" --output $tmpfolder
ls -la $tmpfolder
pscale database restore-dump  "$DB_NAME" "$BRANCH_NAME" --overwrite-tables --org "$ORG_NAME" --dir $tmpfolder