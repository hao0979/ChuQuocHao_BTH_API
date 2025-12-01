// const { successResponse, errorResponse } = require('../helpers/response')
import { users } from '../model/user.js';
export const getallUsers = (req, res) => {
  res.status(200).json(users)
}
export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.status(404).json({ 
      status: 404,      
      message: `User by ${id} not found`
    });
  }
res.status(200).json(user);
}

// /**
//  * @param {import('../index').AppContext} ctx
//  */
// const detail = async (ctx) => {
//   try {
//     // get email from query param
//     const query = ctx.query || {}
//     if (!query.email) {
//       return ctx.badRequest(
//         errorResponse(400, 'Email param required')
//       )
//     }

//     // get from repository
//     const user = await ctx.repo.user.getUserByEmail(query.email)
//     if (user) {
//       return ctx.ok(
//         successResponse(user)
//       )
//     }

//     // throw error on non exist data
//     return ctx.badRequest(
//       errorResponse(400, 'User not found')
//     )
//   } catch (err) {
//     console.error(err)
//     return ctx.throw(err.error.code, err)
//   }
// }

// module.exports = {
//   detail
// }