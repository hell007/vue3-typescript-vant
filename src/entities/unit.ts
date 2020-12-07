/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import Mock from 'mockjs';

export interface UnitModel {
  id?: number;
  title: string;
  desc: string;
  status: number;
  createTime: string;
  photos?: Array<string>;
}

export class Unit {
  //constructor() {}

  //数据请求模拟
  getList = (q: any) => {
    return new Promise((resolve, _reject) => {
      let res: any[] | null;
      // res = null  暂无数据
      // 有数据
      if (q.pageNum <= 3) {
        res = [];
        for (let i = 0; i < q.pageSize; i++) {
          let temp = Mock.mock({
            id: '@increment',
            'title|1': ['管理员', '后端开发', '测试'],
            'desc|1': [
              '我是一个领导，所有的事情都由我决定。',
              '我是一个java开发人员，所有技术按我说的做。',
              '我是一个高级测试，我说了算。'
            ],
            'status|1': [1, 2],
            createTime: '@datetime', // +Mock.Random.date('T'),
            photos: []
          });
          res.push(temp);
        }
      } else {
        //数据没有了
        res = [];
      }
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  };

  // create = () => {};

  // update = () => {};

  // delete = () => {};
}
