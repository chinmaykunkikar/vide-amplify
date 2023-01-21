import {
  ModelInit,
  MutableModel,
  __modelMeta__,
  ManagedIdentifier,
} from "@aws-amplify/datastore";
// @ts-ignore
import {
  LazyLoading,
  LazyLoadingDisabled,
  AsyncCollection,
} from "@aws-amplify/datastore";

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly Videos?: (Video | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly Videos: AsyncCollection<Video>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type User = LazyLoading extends LazyLoadingDisabled
  ? EagerUser
  : LazyUser;

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(
    source: User,
    mutator: (draft: MutableModel<User>) => MutableModel<User> | void
  ): User;
};

type EagerVideo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Video, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly resourceURI?: string | null;
  readonly thumbnailURI?: string | null;
  readonly username?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyVideo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Video, "id">;
    readOnlyFields: "createdAt" | "updatedAt";
  };
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly resourceURI?: string | null;
  readonly thumbnailURI?: string | null;
  readonly username?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Video = LazyLoading extends LazyLoadingDisabled
  ? EagerVideo
  : LazyVideo;

export declare const Video: (new (init: ModelInit<Video>) => Video) & {
  copyOf(
    source: Video,
    mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void
  ): Video;
};
