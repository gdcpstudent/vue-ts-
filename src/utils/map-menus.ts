import { IBreadcrumb } from '@/base-ui/breadcromb'
import user from '@/router/main/system/user/user'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // require require是文件自带的函数.context('导入文件的地址', 是否递归查找布尔类型, 什么文件格式)
  routeFiles.keys().forEach((key) => {
    // console.log(key) //文件的路径
    //.system/user/user.ts
    //切割完拿到system/user/user
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  //2.根据菜单获取需要添加routes
  //userMenus:
  //type === 1 -> children -> type ==1
  //type ==2 -> url -> route
  const _recureGetRoute = (menus: any[]) => {
    //定义一个递归函数
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recureGetRoute(menu.children)
      }
    }
  }
  _recureGetRoute(userMenus)
  return routes
}

const breadcrombs: IBreadcrumb[] = []

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrombs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrombs)
  return breadcrombs
}

//根据当前的路径取匹配userMenus的路径
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrombs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrombs?.push({ name: menu.name })
        breadcrombs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

//合并pathMapBreadcrumbs和pathMapToMenu前

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrombs.push({ name: menu.name, path: menu.url })
//         breadcrombs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrombs
// }

// //根据当前的路径取匹配userMenus的路径
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recursetPermissions = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recursetPermissions(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recursetPermissions(userMenus)
  return permissions
}

// 角色菜单数据回显的函数
export function mapMenusToLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recuresetMap = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recuresetMap(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recuresetMap(menuList)
  return leftKeys
}
export { firstMenu }
