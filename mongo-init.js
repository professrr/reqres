db.createUser(
        {
            user: "test",
            pwd: "password",
            roles: [
                {
                    role: "readWrite",
                    db: "reqres"
                }
            ]
        }
);