#!/bin/bash

# Build for deploy
echo -e "===============================\nStart building binary"
if yarn build; then
    echo "Build success"
else
    echo "Build failed"
    exit
fi

echo -e "===============================\nStart deploy"
if sshpass -p "Over.1234" scp -r ./dist/* thekogo@20.205.185.30:~/over-review-backend/; then
    echo "Done copy to server"
    if sshpass -p "Over.1234" ssh thekogo@20.205.185.30 "pm2 restart main"; then
        echo "deploy success let me sleep"
    else
        echo "Cannot restart service call me 090-323-4466"
        exit
    fi
else
    echo "Can't copy to server"
    exit
fi
