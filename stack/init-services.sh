#!/bin/bash
SCRIPT_TIME=$SECONDS
NODE_ENV=local
INNER_STDOUT="/dev/null"
VERBOSE=0
NEWLINE=-n
LAST_STAGE=
BACKEND="./backend"
PROJECT_NAME="xepelin-challenge"

if [ "$1" == "--verbose" ]
then
  NEWLINE=
  VERBOSE=1
  INNER_STDOUT="/dev/tty";
fi

stage() {
  LAST_STAGE=$2
  echo $NEWLINE "$1$2 ";
}

end_stage() {
  ERRORLEVEL=${?}
  if [ $ERRORLEVEL != "0" ]
  then
    echo
    echo "❌ Stage: '$LAST_STAGE' failed. Errorcode: "$ERRORLEVEL
    echo "Execute 'npm run services:init -- --verbose' for more info"
    exit 1;
  fi

  if [ $VERBOSE == 1 ]
  then
    echo
    echo "✅ Stage: '$LAST_STAGE' Completed sucessfully";
    echo
  else
    echo "✅ ";
  fi
}

sleep_indicator() {
  if [ $VERBOSE == 0 ]
  then
    echo -n "💤"
  fi
  sleep $1
}

if test -f $BACKEND/.env
then
  read -p "⚠️️ Warning! This script deletes the local data of previous databases, and replaces the .env file. Do you want to continue (Y/N)? " -n 1 -r
  echo    # (optional) move to a new line
  if [[ ! $REPLY =~ ^[Yy]$ ]]
  then
    echo "User selected 'no'. Exiting gracefully"
    exit 0
  fi
fi

stage "🗄" "Generating .env file"
  cp $BACKEND/.env.example $BACKEND/.env
end_stage

stage "🛑" "Removing previous docker instances..."
docker-compose -f stack/docker-compose.yml -p $PROJECT_NAME-stack rm -v -f -s > $INNER_STDOUT 2> $INNER_STDOUT
docker volume rm $PROJECT_NAME-data -f > $INNER_STDOUT 2> $INNER_STDOUT
end_stage

stage "🟢" "Starting docker instances..."
docker-compose -p $PROJECT_NAME-stack -f stack/docker-compose.yml up -d 2> $INNER_STDOUT
end_stage



