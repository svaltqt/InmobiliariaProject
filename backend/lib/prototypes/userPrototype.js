export class UserPrototype {
    constructor({
                    fullName = "",
                    username = "",
                    email = "",
                    password = "",
                    address = "",
                    tel = "",
                    type = "client",
                    profileImg = "",
                    bio = ""
                } = {}) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.tel = tel;
        this.type = type;
        this.profileImg = profileImg;
        this.bio = bio;
    }

    clone() {
        return new UserPrototype({ ...this });
    }
}