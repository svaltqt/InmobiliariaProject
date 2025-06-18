export const clientPrototype = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    type: "cliente",
    profileImage: "",
    bio: "",
    favorites: []
};

export const ownerPrototype = {
    ...clientPrototype,
    type: "propietario"
};
