export enum EVENT {
  TO_SERVER = 'TO_SERVER',
  CHAT_MSG = 'CHAT_MSG',
  LOGGED_IN_LIST = 'LOGGED_IN_LIST',
  FOR_HELP = 'FOR_HELP',
  JOIN_ROOM = 'JOIN_ROOM',
  EXCEPTION = 'exception', // default by NEST_JS when an error is thrown
}

export const NAMESPACE = '/socket';

export enum chatUserType {
  PERSON = 'person',
  OTHER = 'otherPerson',
}
