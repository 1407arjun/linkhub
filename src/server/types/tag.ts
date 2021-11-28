import User from './user'

export default interface Tag {
    name: string;
    followers: [ User ];
    related: [ string ];
}