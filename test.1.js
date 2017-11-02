var obj=[
    {
      "_id": "59fb0ced942ef9113833a246",
      "title": "0",
      "author": "youthfighter",
      "content": "content",
      "hidden": false,
      "__v": 0,
      "createDate": "2017-11-02T12:17:49.699Z",
      "lastUpdate": "2017-11-02T12:17:49.699Z"
    },
    {
      "_id": "59fb0e4d2eef101300e7a6f8",
      "title": "12",
      "author": "youthfighter",
      "content": "content",
      "hidden": false,
      "__v": 0,
      "createDate": "2017-11-02T12:23:41.933Z",
      "lastUpdate": "2017-11-02T12:23:41.933Z"
    }
  ]
obj.forEach((item)=>{
    item.aaa='0';
})
console.dir(obj);