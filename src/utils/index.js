export function localGet (key) {
    const value = window.localStorage.getItem(key)
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      return value
    }
  }
  
  export function localSet (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  export function localRemove (key) {
    window.localStorage.removeItem(key)
  }
  
  // 声明路由和title对应关系
  export const pathMap = {
    home : '首页',
    about : '关于',
    upvideo : '视频',
    student : '学员管理',
    permission : '权限配置',
    document : '文档管理',
    video : '视频管理',
    resource: '资源管理',
    mate : '标签管理',
    categories : '分类管理',
    course : '课程管理',
    test : '试题管理'
  }