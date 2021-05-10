import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Video {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly resourceURI?: string;
  constructor(init: ModelInit<Video>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void): Video;
}