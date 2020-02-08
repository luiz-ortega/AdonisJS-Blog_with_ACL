'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.put('/users/:id', 'UserController.update').middleware('auth')

Route.post('/sessions', 'SessionController.store')

Route.resource('/posts', 'PostController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || moderator)'])

Route.get('/posts', 'PostController.index').middleware([
  'auth',
  'can:(read_posts || read_private_posts)'
])

Route.get('/posts/:id', 'PostController.show').middleware([
  'auth',
  'can:(read_posts || read_private_posts)'
])

Route.resource('/permissions', 'PermissionController')
  .apiOnly()
  .middleware('auth')

Route.resource('/roles', 'RoleController')
  .apiOnly()
  .middleware('auth')
