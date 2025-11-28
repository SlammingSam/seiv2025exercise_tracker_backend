import db  from "../models/index.js";
import authconfig  from "../config/auth.config.js";
import { OAuth2Client } from "google-auth-library";
import  { google } from "googleapis";
import jwt from "jsonwebtoken";

const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;

let googleUser = {};

const google_id = process.env.CLIENT_ID;

const exports = {};

exports.login = async (req, res) => {

  var googleToken = req.body.credential;
  const client = new OAuth2Client(google_id);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: google_id,
    });
    googleUser = ticket.getPayload();
    console.log("Google payload is " + JSON.stringify(googleUser));
    //return googleUser; //why is this commented?
  }
  await verify().catch(console.error);

  let email = googleUser.email;
  let firstName = googleUser.given_name;
  let lastName = googleUser.family_name;
  let userPicture = googleUser.picture;
  let user = {};
  let session = {};

  //console.log(userPicture);

  await User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      } else {
        // create a new User and save to database
        user = {
          fName: firstName,
          lName: lastName,
          email: email,
          picture: userPicture,
        };
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  // this lets us get the user id
  if (user.id === undefined) 
  {
  console.log(user);

  try {
    const data = await User.create(user);
    user = data.dataValues;
      // continue — do not return here so we can create a session for the new user
      // previously returned the user immediately which prevented session creation
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).send({ message: err.message });
  }

  } 
  else 
  {
    // ensure that the user's name matches Google
    user.fName = firstName;
    user.lName = lastName;

    try 
    {
      const num = await User.update(user, { where: { id: user.id } });
      if (num == 1) {
        console.log("Updated user's name");
      } else {
        console.log(`Cannot update User with id=${user.id}.`);
      }
    } 
    catch (err) 
    {
      console.error("Error updating User:", err);
      return res.status(500).send({ message: err.message });
    }
  }

  // try to find session first
  await Session.findOne({
    where: {
      email: email,
      token: { [Op.ne]: "" },
    },
  })
    .then(async (data) => {
      if (data !== null) {
        session = data.dataValues;
        if (session.expirationDate < Date.now()) {
          session.token = "";
          // clear session's token if it's expired
          await Session.update(session, { where: { id: session.id } })
            .then((num) => {
              if (num == 1) {
                console.log("successfully logged out");
              } else {
                console.log("failed");
                res.send({
                  message: `Error logging out user.`,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: "Error logging out user.",
              });
            });
          //reset session to be null since we need to make another one
          session = {};
        } else {
          // if the session is still valid, then send info to the front end
          let userInfo = {
            email: user.email,
            fName: user.fName,
            lName: user.lName,
            userId: user.id,
            token: session.token,
            picture: userPicture,
            // refresh_token: user.refresh_token,
            // expiration_date: user.expiration_date
          };
          console.log("found a session, don't need to make another one");
          console.log(userInfo);
          destoryOldSessions(userInfo);
          res.send(userInfo);
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
    });

  if (session.id === undefined) 
  {
    // create a new Session with an expiration date and save to database
    let token = jwt.sign({ id: email }, authconfig.secret, {
      expiresIn: 86400,
    });
    let tempExpirationDate = new Date();
    tempExpirationDate.setDate(tempExpirationDate.getDate() + 1);
    const session = {
      token: token,
      email: email,
      userId: user.id,
      expirationDate: tempExpirationDate,
      picture: userPicture,
    };

    console.log("making a new session");
    console.log("session: " + session);

    await Session.create(session)
      .then(() => {
        let userInfo = {
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          userId: user.id,
          token: token,
          picture: userPicture,
          // refresh_token: user.refresh_token,
          // expiration_date: user.expiration_date
        };
        console.log("userInfo: " + userInfo);
        destoryOldSessions(userInfo);
        res.send(userInfo);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    }
  };

  exports.authorize = async (req, res) => {
  console.log("authorize client");
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  console.log("authorize token");
  let { tokens } = await oauth2Client.getToken(req.body.code);
  oauth2Client.setCredentials(tokens);

  let user = {};
  console.log("findUser");

  await User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
  console.log("user");
  console.log(user);
  user.refresh_token = tokens.refresh_token;
  let tempExpirationDate = new Date();
  tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
  user.expiration_date = tempExpirationDate;

  await User.update(user, { where: { id: user.id } })
    .then((num) => {
      if (num == 1) {
        console.log("updated user's google token stuff");
      } else {
        console.log(
          `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
        );
      }
      let userInfo = {
        refresh_token: user.refresh_token,
        expiration_date: user.expiration_date,
      };
      console.log(userInfo);
      destoryOldSessions(userInfo);
      res.send(userInfo);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  console.log(tokens);
  console.log(oauth2Client);
};


async function destoryOldSessions(userInfo) //trying to remove all of the expired keys for the old user sessions
{
  await Session.destroy({
    where: {
      email: userInfo.email,
      [Op.or]: [{ token: "" }, { token: null }],//won't accept any other syntax, also dont know what Op.or is but its in Norths code
    }
  });
}

// Log user out by clearing their session token
exports.logout = async (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.token) { //check if null or missing token
    return res.send({ 
      message: "User has already been logged out or token is missing!",
    });
  }

  let session = {};

  try {
    const data = await Session.findAll({ where: { token: req.body.token } });
    if (data[0] !== undefined) {
      session = data[0].dataValues;
    } else {
      console.log("already logged out");
      return res.send({ //return if no session is found
        message: "User has already been logged out!",
      });
    }
  } catch (err) {
    return res.status(500).send({ // return an error if something goes wrong (as always will happen)
      message: err.message || "an error occurred while retrieving sessions.",
    });
  }

  session.token = "";

  try {
    const num = await Session.update(session, { where: { id: session.id } });
    if (num == 1) {
      console.log("successfully logged out");
      return res.send({ 
        message: "User has been logged out!",
      });
    } else {
      console.log("failed");
      return res.send({ 
        message: `Error logging out user.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ 
      message: "Error logging out user.",
    });
  }
};
export default exports;
