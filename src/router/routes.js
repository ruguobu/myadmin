import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import StudentManagement from '../views/UserView/StudentManagement.vue'//学员管理
import PermissionManagement from '../views/PermissionView/PermissionManagement.vue'//权限配置
import DocumentManagement from '../views/ResourceView/DocumentManagement.vue'//文档管理
import VideoManagement from '../views/ResourceView/VideoManagement.vue'//视频管理
import ResourceManagemet from '../views/ResourceView/ResourceManagemet.vue'//资源管理
import TestManagement from '../views/ResourceView/TestManagement.vue'//试题管理
import CategoriesManagement from '../views/Categories/CategoriesManagement.vue'//分类管理
import CourseManagement from '../views/Course/CourseManagement.vue'//课程管理
import MateManagement from '../views/Categories/MateManagement.vue'//标签管理

const routes = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: Home
    // },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'student',
        component: StudentManagement
    },
    {
        path: '/permission',
        name: 'permission',
        component: PermissionManagement
    },
    {
        path: '/document',
        name: 'document',
        component: DocumentManagement
    },
    {
        path: '/video',
        name: 'video',
        component: VideoManagement
    },
    {
        path: '/resource',
        name: 'resource',
        component: ResourceManagemet
    },
    {
        path: '/mate',
        name: 'mate',
        component: MateManagement
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoriesManagement
    },
    {
        path: '/course',
        name: 'course',
        component: CourseManagement
    },
    {
        path: '/test',
        name: 'test',
        component: TestManagement
    }
    // { path: '*', component: Login }
]

export default routes
