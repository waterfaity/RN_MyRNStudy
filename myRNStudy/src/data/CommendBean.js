/**
 * 评论bean
 */
export default class CommendBean {
  id: number;
  cookMenuId: number;
  userId: String;
  userIcon: String;
  userNickName: String;
  parentId: number;
  createTime: String;
  content: String;
  praiseNum: number;
  isPraised: number;
  subComments: Array<CommendBean>;
}