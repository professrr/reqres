mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);
    
    var dbUser = '$MONGO_INITDB_USERNAME';
    var dbPass = '$MONGO_INITDB_PASSWORD';
    var dbName = '$MONGO_INITDB_DATABASE';

    db.createUser(
        {
            user: dbUser,
            pwd: dbPass,
            roles: [
                {
                    role: "readWrite",
                    db: dbName
                }
            ]
        }
    );

    use $MONGO_INITDB_DATABASE
    db.users.createIndex(
        {
            "id": 1
        },
        {
            unique: true
        }
    )
EOF