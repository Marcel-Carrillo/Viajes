const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class userController {

  //1.Crear usuario
  //localhost:4000/users/createUser

  createUser = (req, res) => {
    // const { name, lastname, phone, address, email, password } = JSON.parse(
    //   req.body.register
    // );
    const { name, email, password } = req.body;
       
    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, lastname, phone, address, email, password) VALUES ( '${name}',"", "", "", '${email}', '${hash}')`;

        connection.query(sql, (error, result) => {
          console.log("Esto es el error",error);
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };


  //-------------------------------------------------  
  //2.- Login
  //localhost:4000/users/login
  login = (req, res) => {
    let { email, password } = req.body;
    console.log(req.body)
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      console.log(result)

      // console.log(result[0].is_deleted, "==========result===============");
      //en caso de error en la consulta
      if (error) return res.status(400).json(error);

      //en caso de no encontrar un user con dicho user_name o mail.
      if (!result || !result.length ||result[0].is_deleted == 1) {
        res.status(401).json("Usuario no registrado");
      } else {
        //en caso de que el mail o user_name SEA correcto
        //aqui lo estamos haciendo con el mail
        const [user] = result;
        const hash = user.password;

        //capturo el user_id
        const user_id = user.user_id;

        //compramos contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          // if (error) console.log(error)
          if (error) return res.status(400).json(err);
          //si las contraseñas coinciden
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  name: user.name,
                  id: user_id,
                  type: user.type,
                  img: user.img
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token, user:result[0] });
            //si las contraseñas coinciden
          } else {
            res.status(401).json("Usuario y contraseña incorrectos");
          }
        });
      }
    });
  };
  
  
  //---------------------------------------------------
  //3.- Trae la información de un usuario
  //localhost:4000/users/oneUser/:user_id  
  
  selectOneUser = (req, res) => {
    const user_id = req.params.user_id;

    let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id} and is_deleted = 0`;
    let sqlTravel = `SELECT * FROM travel WHERE user_id = ${user_id} and is_deleted = 0`;
    connection.query(sqlUser, (error, resultUser) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sqlTravel, (error2, resultTravel) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultUser, resultTravel });
      });
    });
  };
  //---------------------------------------------------
  // 4.- Trae todos los usuarios de la tabla user
  //localhost:4000/users/allUser   
  selectAllUsers = (req, res) => {
    
    console.log("headerrresssdasdasda",req.headers.authorization);
    

    let sql = `select user.*, travel.*, photo.* from user, travel, photo where user.user_id = travel.user_id and travel.travel_id = photo.travel_id and user.type=0 and travel.is_deleted = 0 and user.is_deleted = 0 group by travel.travel_id ORDER BY RAND() `;

    // let sql ="SELECT * FROM user"
    
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

//-----------------------------------------------------
/// 5.- Editar un usuario
//localhost:4000/users/editUser/:userId
editUser = (req, res) => {
  let user_id = req.params.user_id;
  console.log("esteeee eeesss ellll user_id", user_id) ;
  console.log(JSON.parse(req.body.register))
  
  const { name, lastname, phone, address, email } = JSON.parse(
    req.body.register);

  // const { name, lastname, phone, address, email } = req.body;

  let img = "";

  let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone = "${phone}", address = "${address}",email = "${email}" WHERE user_id = "${user_id}"`;

  if (req.file != undefined) {
    img = req.file.filename;
    sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone = "${phone}", address = "${address}",email = "${email}", img = "${img}" WHERE user_id = "${user_id}"`;
  }
  console.log("*****imagen******",img);
  

  connection.query(sql, (error, result) => {
    if (error) throw error;
    error ? res.status(400).json({ error }) : res.status(200).json({result, img});
  });
};

  //-----------------------------------------------
  // 6.- Eliminar un usuario de manera lógica
  //localhost:4000/users/deleteUser/:userId

  deleteUser = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

 //-----------------------------------------------
  // 7.- Trae la info de un usuario para editarlo
  //localhost:4000/users/editUser/:userId

  getEditOneUser = (req, res) => {
    console.log(req);
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };


  // 8.- Trae todas las fotos de un usuario con todos sus viajes
  //localhost:4000/users/getAllPhotos/:user_id 
  getAllPhotos = (req, res) => {
  console.log("********//////////*********",req.params);
    let user_id = req.params.user_id;
    
    let sql = `select user.*, travel.*, photo.* from user, travel, photo where user.user_id = travel.user_id and travel.travel_id = photo.travel_id and user.type=0 and travel.is_deleted = 0 and user.is_deleted = 0 and user.user_id = ${user_id} group by travel.travel_id`;
    let sql2 = `select travel.*, photo.* from travel, photo where travel.user_id = ${user_id} and travel.travel_id = photo.travel_id and travel.is_deleted = 0`;


    connection.query(sql, (error, resultTravels) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, resultPhotos) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultTravels, resultPhotos });
      });
    });
  };

}

module.exports = new userController();
