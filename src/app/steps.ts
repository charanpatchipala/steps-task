export interface Steps {
  name: string;
  inProgress: boolean;
  isCompleted: boolean;
}
export interface MainObject extends Array<{ [key: string]: Steps }> {}

// export interface MainObject {
//    [key: string]: Steps;
// }
