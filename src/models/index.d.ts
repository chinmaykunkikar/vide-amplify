import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Video {
  readonly id: string;
  readonly title?: string;
  readonly views?: number;
  readonly s3uri?: string;
  readonly userID?: string;
  readonly User?: User;
  constructor(init: ModelInit<Video>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void): Video;
}

export declare class User {
  readonly id: string;
  readonly username?: string;
  readonly user_i?: number;
  readonly Videos?: (Video | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}