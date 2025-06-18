import { UserPrototype } from "./userPrototype.js";

export const clientPrototype = new UserPrototype({
    type: "client",
    profileImg: "default-client.jpg",
    bio: "Cliente nuevo"
});

export const ownerPrototype = new UserPrototype({
    type: "owner",
    profileImg: "default-owner.jpg",
    bio: "Propietario de inmuebles"
});