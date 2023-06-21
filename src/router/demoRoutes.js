
  export default [
    
    {
      path: 'customDemo:lang(-cn)?',
      meta: {"category":"Components","type":"数据展示","title":"customDemo","subtitle":null,"cover":null},
      component: () => import('../../packages/components/customDemo/demo/index.vue'),
    },
    {
      path: 'Icon:lang(-cn)?',
      meta: {"category":"Components","type":"通用","title":"Icon","subtitle":null,"cover":null},
      component: () => import('../../packages/components/Icon/demo/index.vue'),
    },
  ];