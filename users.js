let users = [
    {id: 1, firstName: "first1", lastName: "last1", email: "abc@gmail.com"},
    {id: 2, firstName: "first2", lastName: "last2", email: "abc@gmail.com"},
    {id: 3, firstName: "first3", lastName: "last3", email: "abc@gmail.com"},
    {id: 4, firstName: "first4", lastName: "last4", email: "abc@gmail.com"}
]

function getUsers() {
    return users;
}

function saveUser(user) {
    const numberOfUsers = users.length
    user['id'] = numberOfUsers + 1
    users.push(user);
}

function deleteUser(id) {
    const numberOfUsers = users.length
    users = users.filter(user => user.id != id);
    return users.length !== numberOfUsers
}

function replaceUser(id, user) {
    const foundUser = users.filter(usr => usr.id == id);
    if (foundUser.length === 0) return false
    users = users.map(usr => {
        if (id == usr.id) {
            usr = {id: usr.id, ...user};
        }
        return usr
    })
    return true
}

const Users = function() {}

Users.prototype.getUsers = getUsers
Users.prototype.saveUser = saveUser
Users.prototype.deleteUser = deleteUser
Users.prototype.replaceUser = replaceUser


module.exports = new Users()