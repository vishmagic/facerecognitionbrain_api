const handleSignin = (req, res, db, bcrypt) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json('Invalid entries in the form')
    }

    db
    .select('email','hash').from('login').where('email','=',req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
            return db
            .select('*').from('users').where('email','=',req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to fetch user details!'))
        } else {
            res.status(400).json('Entered wrong credentials!')
        }
    })
    .catch(err => res.status(400).json('Unable to connect and validate'))
}

module.exports = {
    handleSignin: handleSignin
}