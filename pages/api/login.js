import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../lib/password-local'
import { setLoginSession } from '../../lib/auth'

import { Strategy as LichessStrategy } from 'passport-lichess';

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(new LichessStrategy({
    clientID: 'some-unique-chess-id-123',
    callbackURL: "http://localhost:3000/login"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile)
    return cb(null, null);
    // User.findOrCreate({ lichessId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
))

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('lichess', req, res)
      // session is the payload to save in the token, it may contain basic info about the user
    //   const session = { ...user }

    //   await setLoginSession(res, session)

    //   res.status(200).send({ done: true })
    // } catch (error) {
    //   console.error(error)
    //   res.status(401).send(error.message)
    }
  })
