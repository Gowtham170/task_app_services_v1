import { User } from '../model/index.js';

//getSpecificUserDetails
const getUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

export { getUserDetails }