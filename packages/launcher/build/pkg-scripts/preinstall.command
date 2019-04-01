#!/usr/bin/env bash

NODE_EXISTS=false
BREW_EXISTS=false
DAEMON_EXISTS=false

dependencies() {
    echo "Checking system dependencies..."
}

checkNode() {
    dependencies;
    if hash node 2>/dev/null; then
        NODE_EXISTS=true
    else
        echo "No local Node.js installations were found."
        NODE_EXISTS=false
    fi
}

checkBrew() {
    dependencies;
    if hash brew 2>/dev/null; then
        BREW_EXISTS=true
    else
        echo "No local Homebrew installations were found."
        BREW_EXISTS=false
    fi
}

checkDaemon() {
    dependencies;
    if hash mainframed 2>/dev/null; then
        DAEMON_EXISTS=true
    else
        echo "No local Mainframe Daemon installations were found."
        DAEMON_EXISTS=false
    fi
}

installBrew() {
    echo "Attempting to install Homebrew package manager..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
}

installNode() {
    echo "Installing Node.js...";
    brew install node
}

installDaemon() {
    echo "Installing the Mainframe Daemon...";
    npm install --global @mainframe/daemon
}

main() {
    checkNode

    if [ $NODE_EXISTS == true ]; then
       checkDaemon
       if [ $DAEMON_EXISTS == true ]; then
            echo "System preinstall complete.";
            exit 0;
       else
            installDaemon;
            echo "System preinstall complete.";
            exit 0;
       fi
    else
        checkBrew;
        if [ $BREW_EXISTS == true ]; then
            installNode;
            main;
        else
            installBrew;
            main;
        fi
    fi

    exit 0;
}

main