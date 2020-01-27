'use strict'

const Post = use('App/Models/Post')

class PostController {
  async index({ request, response, view }) {
    const posts = await Post.query()
      .with('user')
      .fetch()

    return posts
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'body'])

    const post = await Post.create({ ...data, user_id: auth.user.id })

    return post
  }

  async show({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.load('user')

    return post
  }

  async update({ params, request }) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'body'])

    post.merge(data)

    await post.save()

    return post
  }

  async destroy({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController
