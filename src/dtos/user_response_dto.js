const buildUserDTOResponse = user => {
    return {
        username: user.username,
        email: user.email,
        userType: user.userType
    }
}

module.exports = buildUserDTOResponse