import TypeUser from './user'

export default interface Tag {
    name: string;
    followers: [ TypeUser ];
    related: [ string ];
}