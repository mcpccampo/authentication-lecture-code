INSERT INTO users (
    email,
    password
) VALUES (
    ${email},
    ${hash}
)

returning user_id, email;